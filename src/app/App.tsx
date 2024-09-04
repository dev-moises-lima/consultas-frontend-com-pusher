import "bootstrap/dist/css/bootstrap.min.css"
import { Home } from "./pages/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PatientPage } from "./pages/PatientPage"
import { useEffect, useState } from "react"
import { Patient } from "./types/Patient"
import { api } from "./service/api"
import { UpdatedPatientEvent } from "./types/events/UpdatedPatientEvent"

export function App() {
  const [patients, setPatients] = useState<Patient[]>()
  const mainUpdatesChannel =  window.Echo.channel('main-updates')

  mainUpdatesChannel.listen('PatientRegistered', (event: {patient: Patient}) => {
      addPatient(event.patient)
    })

  mainUpdatesChannel.listen("UpdatedPatient", (event: any) => {
    const patient = event.data
    const newPatients = patients?.map((currentPatient) => {
      return currentPatient.id === patient.id ? patient : currentPatient
    })

    setPatients(newPatients)
  })

  function addPatient(patient: Patient) {
    if(patients === undefined) {
      return
    }

    setPatients([...patients, patient])
  }

  async function fetchPatients() {
    try {
      const { data } = await api.get("patients")
      setPatients(data)
      console.log(data)
    } catch (erro) {
      console.log(erro)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home
          patients={patients}
          addPatient={addPatient}
        />
    },
    {
      path: 'patient/:patientId',
      element: <PatientPage/>
    }
  ])

  return (
    <main 
      className="conteiner-fluid mx-auto px-4 py-4"
      style={{
        maxWidth: "1400px"
      }}
    >
      <RouterProvider router={router} />
    </main>
  )
}
