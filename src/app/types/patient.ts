import { PatientCondition } from "@/app/types/PatientCondition"

export type Patient = {
    id: number
    name: string
    cpf: string
    dateOfBirth: string
    telephone: string
    photoUrl: string
    currentCondition: PatientCondition
}