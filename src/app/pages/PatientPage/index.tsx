import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { BiPlus } from "react-icons/bi"
import { GrReturn } from "react-icons/gr"
import { PatientInfo } from "./PatientInfo"
import { ConsultationTable } from "./ConsultationTable"
import { api } from "@/app/service/api"
import { Patient } from "@/app/types/Patient"
import ConsultationRegistrationForm from "@/app/components/forms/ConsultationRegistrationForm"
import { Consultation } from "@/app/types/Consultation"
import { RegisteredConsultationEvent } from "@/app/types/events/RegisteredConsultationEvent"
import { ConsultationDetailsModal } from "@/app/components/modals/ConsultationDetailsModal"

export function PatientPage() {
  const [displayingConsultationForm, setdisplayingConsultationForm] = useState(false)
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const [consultationSelected, setConsultationSelected] = useState<Consultation>()
  const { state } = useLocation()
  const [patient, setPatient] = useState<Patient>(state as Patient)
  const [consultations, setConsultations] = useState<Consultation[]>()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const infoPatientRef = useRef(null)
  
  window.Echo.channel(`patient-updates-${patient.id}`)
    .listen('RegisteredConsultation', (event: RegisteredConsultationEvent) => {
      addConsultation(event.consultation)
    })
  
  function addConsultation(consulta: Consultation) {
    if(consultations === undefined) return

    setConsultations([...consultations, consulta])
  }

  function scrollToPatientInfo() {
    if(infoPatientRef.current) {      
      const sessaoInfoPaciente = infoPatientRef.current as HTMLTableSectionElement
      sessaoInfoPaciente.scrollIntoView({behavior: "smooth"})
    }
  }

  function scrollToFormSession() {
    if(formRef.current) {
      const formSection = formRef.current as HTMLTableSectionElement
      formSection.scrollIntoView({behavior: "smooth"})
    }
  }

  useEffect(() => {
    if(displayingConsultationForm) {
      scrollToFormSession()
    } else {
      scrollToPatientInfo()
    }
  }, [displayingConsultationForm])

  function openConsultationForm() {
    setdisplayingConsultationForm(true)
  }

  function closeConsultationForm() {
    setdisplayingConsultationForm(false)
  }
  
  function selectConsultationForDetails(consultation: Consultation) {
    setConsultationSelected(consultation)
    setOpenDetailsModal(true)
  }

  function closeDetailsModal() {
    setOpenDetailsModal(false)
  }

  async function fetchConsultations() {
    try {
      const { data } = await api.get(`patients/${patient.id}/consultations`)
      setConsultations(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchConsultations()
  }, [])

  return (
    <>
      <PatientInfo 
        patient={patient}
        sectionRef={infoPatientRef}
      />
      {displayingConsultationForm ? 
        <section ref={formRef} className="p-3 mt-3 bg-secondary-subtle">
          <ConsultationRegistrationForm 
            patientId={patient.id}
            onCancel={closeConsultationForm}
            onSuccess={(consultation) => {
              addConsultation(consultation)
              closeConsultationForm()
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
              onClick={openConsultationForm} 
              size="lg"
            >
              Cadastrar nova consulta <BiPlus/>
            </Button>
          </div>
        )
      }
      <ConsultationTable 
        consultations={consultations}
        selectConsultationForDetails={selectConsultationForDetails}
      />
      {consultationSelected && (
        <ConsultationDetailsModal
          show={openDetailsModal} 
          consultation={consultationSelected}
          onHide={closeDetailsModal}
        />
      )}
    </>
  )
}


