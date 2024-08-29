import { CondicaoDoPaciente } from "@/app/lib/minhas-interfaces-e-tipos"

export type Patient = {
    id: number
    name: string
    cpf: string
    dateOfBirth: string
    telephone: string
    photoUrl: string
    currentCondition: CondicaoDoPaciente
}