export interface RegisterPatientInitialValues{
    name: string
    cpf: string
    dateOfBirth: string
    telephone: string
    photo: File | null
}

export const registerPatientIniialValues : RegisterPatientInitialValues = {
    name: "",
    cpf: "",
    dateOfBirth: "",
    telephone: "",
    photo: null,
}