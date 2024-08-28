type RegisterConsultationIniialValues = {
    diastolicBloodPressure: string
    systolicBloodPressure: string
    heartRate: string
    respiratoryRate: "",
    temperature: string
    symptoms: string[] | string
}

export const registerConsultationIniialValues : RegisterConsultationIniialValues = {
    diastolicBloodPressure: "",
    systolicBloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
    symptoms: []
}