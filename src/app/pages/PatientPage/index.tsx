import { useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { BiPlus } from "react-icons/bi"
import { GrReturn } from "react-icons/gr"
// import { FormularioDeConsulta } from "./formulario-de-consulta"
import { PatientInfo } from "./PatientInfo"
import { ConsultationTable } from "./ConsultationTable"
// import { Mensagem } from "../../lib/minhas-interfaces-e-tipos"
import { api } from "@/app/service/api"
import { useLocation, useNavigate, useParams } from "react-router-dom"
// import { Notificacao } from "../../components/notificacao"
import { Patient } from "@/app/types/Patient"
import ConsultationRegistrationForm from "@/app/components/forms/ConsultationRegistrationForm"
import { Consultation } from "@/app/types/Consultation"
import { RegisteredConsultationEvent } from "@/app/types/events/RegisteredConsultationEvent"
import { ConsultationAccordion } from "./ConsultationAccordion"

export function PatientPage() {
  // const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [exibindoFormularioDeConsulta, setMostrarFormularioDeConsulta] = useState(false)
  const { state } = useLocation()
  const [patient, setPatient] = useState<Patient>(state as Patient)
  const [consultations, setConsultations] = useState<Consultation[]>()
  const { patientId } = useParams()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const infoPatientRef = useRef(null)
  
  if(!state) {
    navigate("/")
  }

  window.Echo.channel(`patient-updates-${patientId}`)
    .listen('RegisteredConsultation', (event: RegisteredConsultationEvent) => {
      addConsultation(event.consultation)
    })
  
  function addConsultation(consulta: Consultation) {
    if(consultations === undefined) return

    setConsultations([...consultations, consulta])
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
  
  // function removerMensagem(codigoDaMensagem: string) {
  //   setMensagens(mensagens.filter((mensagen) => mensagen[2] !== codigoDaMensagem))
  // }

  // function adicionarMensagem(mensagem: Mensagem) {
  //   setMensagens([...mensagens, mensagem])
  // }

  // async function fetchPatient() {
  //   try {
  //     const response = await api.get(`patients/${patientId}`)
  //     console.log(response)
      
  //     setPatient(response.data.data)
  //     fetchConsultations()
  //   } catch (error) {      
  //     console.log(error)
  //   }
  // }
  
  async function fetchConsultations() {
    try {
      const { data } = await api.get(`patients/${patientId}/consultations`)
      setConsultations(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchConsultations()
  }, [patientId])

  return (
    <>
      {/* {mensagens && mensagens.slice().reverse().map(mensagem => (
        <Notificacao
          onClose={() => removerMensagem(mensagem[2])}
          variante={mensagem[1]}
          key={mensagem[2]}
        >
          {mensagem[0]}
        </Notificacao>
      ))} */}
      {patient ? (
        <>
          <PatientInfo 
            paciente={patient}
            sectionRef={infoPatientRef}
          />
          {exibindoFormularioDeConsulta ? 
            <section ref={formRef} className="p-3 mt-3 bg-secondary-subtle">
              <ConsultationRegistrationForm 
                onCancel={esconderFormularioDeConsulta}
                onSuccess={(consultation) => {
                  addConsultation(consultation as Consultation)
                  esconderFormularioDeConsulta()
                  setPatient({
                    ...patient,
                    currentCondition: consultation.condition
                  })
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
                  size="lg"
                >
                  Cadastrar nova consulta <BiPlus/>
                </Button>
              </div>
            )
          }
          <ConsultationTable 
            consultations={consultations}
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


