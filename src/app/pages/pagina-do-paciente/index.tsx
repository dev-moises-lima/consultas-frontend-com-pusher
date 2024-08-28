import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { BiPlus } from "react-icons/bi"
import { GrReturn } from "react-icons/gr"
import { FormularioDeConsulta } from "./formulario-de-consulta"
import { InfoPaciente } from "./info-paciente"
import { TabelaDeConsultas } from "./tabela-de-consultas"
import { Consulta, ConsultaCadastradaEvento, Mensagem } from "../../lib/minhas-interfaces-e-tipos"
import { api } from "../../lib/axios"
import { useNavigate, useParams } from "react-router-dom"
import { Notificacao } from "../../components/notificacao"
import { Patient } from "@/app/types/patient"
import ConsultationRegistrationForm from "@/app/components/forms/ConsultationRegistrationForm"

export function PaginaDoPaciente() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [exibindoFormularioDeConsulta, setMostrarFormularioDeConsulta] = useState(false)
  const [patient, setPatient] = useState<Patient>()
  const [consultas, setConsultas] = useState<Consulta[]>()
  const { pacienteId } = useParams()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const infoPatientRef = useRef(null)

  
  function handleConsultaCadastrada({
    consulta,
    paciente,
  }: ConsultaCadastradaEvento) {
    setPatient(paciente)
    adicionarConsulta(consulta)
  }

  const atualizacoesDoPaciente = window.Echo.channel(`atualizacoes-do-paciente-${pacienteId}`)
  
  atualizacoesDoPaciente.listen('RegisteredConsultation', handleConsultaCadastrada)

  function adicionarConsulta(consulta: Consulta) {
    if(consultas === undefined) {
      return
    }

    setConsultas([...consultas, consulta])
  }

  function rolarParaInfoPaciente() {
    if(infoPatientRef.current) {      
      const sessaoInfoPaciente = infoPatientRef.current as HTMLTableSectionElement
      sessaoInfoPaciente.scrollIntoView({behavior: "smooth"})
    }
  }

  function rolarParaSessaoDoFormulario() {
    if(formRef.current) {
      const sessaoDoFormulario = formRef.current as HTMLTableSectionElement
      sessaoDoFormulario.scrollIntoView({behavior: "smooth"})
    }
  }

  useEffect(() => {
    if(exibindoFormularioDeConsulta) {
      rolarParaSessaoDoFormulario()
    } else {
      rolarParaInfoPaciente()
    }
  }, [exibindoFormularioDeConsulta])

  function exibirFormularioDeConsulta() {
    setMostrarFormularioDeConsulta(true)
  }

  function esconderFormularioDeConsulta() {
    setMostrarFormularioDeConsulta(false)
  }
  
  function removerMensagem(codigoDaMensagem: string) {
    setMensagens(mensagens.filter((mensagen) => mensagen[2] !== codigoDaMensagem))
  }

  function adicionarMensagem(mensagem: Mensagem) {
    setMensagens([...mensagens, mensagem])
  }

  async function obterPaciente() {
    try {
      const response = await api.get(`patients/${pacienteId}`)
      console.log(response)
      
      setPatient(response.data.data)
      obterConsultas()
    } catch (error) {      
      console.log(error)
    }
  }
  
  async function obterConsultas() {
    try {
      const response = await api.get(`patients/${pacienteId}/consultations`)
      setConsultas(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obterPaciente()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacienteId])


  return (
    <>
      {mensagens && mensagens.slice().reverse().map(mensagem => (
        <Notificacao
          onClose={() => removerMensagem(mensagem[2])}
          variante={mensagem[1]}
          key={mensagem[2]}
        >
          {mensagem[0]}
        </Notificacao>
      ))}
      {patient ? (
        <>
          <InfoPaciente 
            paciente={patient}
            sectionRef={infoPatientRef}
          />
          {exibindoFormularioDeConsulta ? 
            <section ref={formRef} className="p-3 mt-3 bg-secondary-subtle">
              <ConsultationRegistrationForm 
                onCancel={esconderFormularioDeConsulta}
                onSuccess={() => {
                  esconderFormularioDeConsulta()
                }}
              />
            </section>
            : (
              <div className="p-3 mt-3 bg-secondary-subtle justify-content-between d-flex">
                <Button
                  onClick={() => navigate("/")}
                  size="lg"
                >
                  Voltar <GrReturn />
                </Button>

                <Button 
                  onClick={exibirFormularioDeConsulta} 
                  size="lg">
                  Cadastrar nova consulta <BiPlus/>
                </Button>
              </div>
            )
          }
          <TabelaDeConsultas 
            consultas={consultas}
          />
        </>
      ) : (
        <div className="p-4 bg-secondary-subtle rounded-2">
          <h1 className="text-info text-center">
            Carregando dados do paciente...
          </h1>
        </div>
      )}
    </>
  )
}


