import { useContext, useEffect, useState } from "react"
import { TabelaDePacientes } from "./tabela-de-pacientes.tsx"
import { Button } from "react-bootstrap"
import { api } from "../../lib/axios.ts"
import { Mensagem, PacienteCadastradoEvento } from "../../lib/minhas-interfaces-e-tipos.ts"
import { Notificacao } from "../../components/notificacao"
import { AxiosError } from "axios"
import { obterMensagemDeErro } from "../../lib/minhas-funcoes.ts"
import { AppContext } from "../../contexts/AppContext.tsx"
import PatientRegistrationModal from "@/app/components/modals/PatientRegistrationModal"
import { Patient } from "@/app/types/Patient"
import { UpdatedPatientEvent } from "@/app/types/events/UpdatedPatientEvent.ts"

export function PaginaPrincipal() {
  const { mudarMensagemDeErroFatal } = useContext(AppContext)
  const [modalDeCadastroAberto, setModalDeCadastroAberto] = useState(false)
  const [patients, setPatients] = useState<Patient[]>()
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  console.log(patients)
  
  const mainUpdatesChannel =  window.Echo.channel('main-updates')

  mainUpdatesChannel.listen('PatientRegistered', (event: PacienteCadastradoEvento) => {
      console.log(event)
      adicionarPaciente(event.patient)
    })

  mainUpdatesChannel.listen("UpdatedPatient", ({ patient }: UpdatedPatientEvent) => {
      const newPatients = patients?.map((currentPatient) => {
        return currentPatient.id === patient.id ? patient : currentPatient
      })

      setPatients(newPatients)
    })

  async function obterPacientes() {
    try {
      const {data} = await api.get("patients")
      setPatients(data.data)
      mudarMensagemDeErroFatal("")
      console.log(data)
    } catch (erro) {
      console.log(erro)
      const axiosError = erro as AxiosError
      
      mudarMensagemDeErroFatal(obterMensagemDeErro(axiosError))

      setTimeout(() => {
        obterPacientes()
      }, 3000)
    }
  }

  useEffect(() => {
    obterPacientes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function adicionarPaciente(paciente: Patient) {
    if(patients === undefined) {
      return
    }

    setPatients([...patients, paciente])
  }

  function removerMensagem(codigoDaMensagem: string) {
    setMensagens(
      mensagens.filter((mensagen) => mensagen[2] !== codigoDaMensagem)
    )
  }

  function fecharModalDeCadastro() {
    setModalDeCadastroAberto(false)
  }

  function abrirModalDeCadastro() {
    setModalDeCadastroAberto(true)
  }

  function handleSuccess(patient: Patient) {
    adicionarPaciente(patient)
    fecharModalDeCadastro()
  }

  return (
    <>
      {mensagens &&
        mensagens.map((mensagem) => (
          <Notificacao
            onClose={() => removerMensagem(mensagem[2])}
            variante={mensagem[1]}
            key={mensagem[2]}
          >
            {mensagem[0]}
          </Notificacao>
        ))}
      <div className="conteiner p-3 p-md-4 bg-info-subtle rounded-2">
        <Button size="lg" onClick={abrirModalDeCadastro}>
          Cadastrar Paciente
        </Button>
      </div>
      <PatientRegistrationModal 
        backdrop="static"
        show={modalDeCadastroAberto}
        onHide={fecharModalDeCadastro}
        onCancel={fecharModalDeCadastro}
        onSuccess={handleSuccess}
      />
      <TabelaDePacientes pacientes={patients} />
    </>
  );
}

