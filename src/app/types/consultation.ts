import { CondicaoDoPaciente } from "../lib/minhas-interfaces-e-tipos"

export type Consultation = {
    id: number
    created_at: string
    diastolicBloodPressure: number
    systolicBloodPressure: number
    heartRate: number
    respiratoryRate: number
    temperature: number
    condition: CondicaoDoPaciente
    symptoms: string[]
}
