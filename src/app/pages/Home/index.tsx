import { useState } from "react"
import { PatientTable } from "./PatientTable.tsx"
import { Button } from "react-bootstrap"
import PatientRegistrationModal from "@/app/components/modals/PatientRegistrationModal"
import { Patient } from "@/app/types/Patient"

type Props = {
  patients: Patient[] | undefined
  addPatient: (patient: Patient) => void
}

export function Home({
  patients,
  addPatient
}: Props) {
  const [modalDeCadastroAberto, setModalDeCadastroAberto] = useState(false)

  function closeRegisterModal() {
    setModalDeCadastroAberto(false)
  }

  function openRegisterModal() {
    setModalDeCadastroAberto(true)
  }

  function handleSuccess(patient: Patient) {
    addPatient(patient)
    closeRegisterModal()
  }

  return (
    <>
      <div className="conteiner p-3 p-md-4 bg-info-subtle rounded-2">
        <Button size="lg" onClick={openRegisterModal}>
          Cadastrar Paciente
        </Button>
      </div>
      <PatientRegistrationModal 
        backdrop="static"
        show={modalDeCadastroAberto}
        onHide={closeRegisterModal}
        onCancel={closeRegisterModal}
        onSuccess={handleSuccess}
      />
      <PatientTable patients={patients} />
    </>
  );
}

