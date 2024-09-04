import { PatientCondition } from "./PatientCondition"

export type Consultation = {
    id: number
    created_at: string
    diastolicBloodPressure: number
    systolicBloodPressure: number
    heartRate: number
    respiratoryRate: number
    temperature: number
    condition: PatientCondition
    percentageOfSymptomsFelt: number
    symptoms: string[]
}
