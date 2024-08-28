import * as Yup from "yup"

export const registerConsultationValidationSchema = Yup.object().shape({
    diastolicBloodPressure: Yup.number().required("Campo abrigatório").min(1, "Valor inválido"),
    systolicBloodPressure: Yup.number().required("Campo abrigatório").min(1, "Valor inválido"),
    heartRate: Yup.number().required("Campo abrigatório").min(1, "Valor inválido"),
    respiratoryRate: Yup.number().required("Campo abrigatório").min(1, "Valor inválido"),
    temperature: Yup.number().required("Campo abrigatório").min(1, "Valor inválido"),
})