import { useState } from "react"

import Form, { FormProps } from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useParams } from "react-router-dom"
import { useFormik } from "formik"
import Swal from "sweetalert2"

import { registerConsultationIniialValues } from "@/app/utils/initialValues/registerConsultation"
import { registerConsultationValidationSchema } from "@/app/utils/validations/registerCnsultation"
import { api } from "@/app/service/api"
import { Consultation } from "@/app/types/Consultation"

type Props = FormProps & {
    onCancel: () => void
    onSuccess: (consultation: Consultation) => void
}

export default function ConsultationRegistrationForm({
    onCancel,
    onSuccess,
    ...rest
}: Props) {
    const { patientId } = useParams()
    const [loadingRequest, setLoadingRequest] = useState(false)
    const formik = useFormik({
        initialValues: registerConsultationIniialValues,
        validationSchema: registerConsultationValidationSchema,
        async onSubmit({symptoms, temperature, ...rest}, { setErrors }) {
            try {
                setLoadingRequest(true)

                const { data } = await api.post(`/consultation/${patientId}`, {
                    ...rest,
                    temperature: Number(temperature).toFixed(1),
                    symptoms: JSON.stringify(symptoms),
                })
                
                console.log(data);
                
                setLoadingRequest(false)
                onSuccess(data)
                Swal.fire({
                    title: "Consulta Registrada!",
                    text: "Sua consulta foi registrada com sucesso!",
                    icon: "success",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                })
            } catch (error: any) {
                console.log(error)
                const errors = error.response.data.errors
                setErrors(errors)
                setLoadingRequest(false)
            }
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit} {...rest}>
            <FloatingLabel
                className="mb-3"
                label="Pressão Arterial Sistólica"
                controlId="systolicBloodPressure"
            >
                <Form.Control
                    autoFocus
                    type="number"
                    min={1}
                    placeholder="Pressão Arterial Sistólica"
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.systolicBloodPressure && formik.errors.systolicBloodPressure)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.systolicBloodPressure}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label="Pressão Arterial Diastólica"
                controlId="diastolicBloodPressure"
            >                    
                <Form.Control
                    type="number"
                    min={1}
                    placeholder="Pressão Arterial Diastólica"
                    value={formik.values.diastolicBloodPressure}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.diastolicBloodPressure && formik.errors.diastolicBloodPressure)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.diastolicBloodPressure}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label="Frequência Cardíaca"
                controlId="heartRate"
            >
                <Form.Control
                    type="number"
                    min={1}
                    placeholder="Frequência Cardíaca"
                    value={formik.values.heartRate}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.heartRate && formik.errors.heartRate)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.heartRate}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label="Frequência Respiratória"
                controlId="respiratoryRate"
            >
                <Form.Control
                    type="number"
                    min={1}
                    placeholder="Frequência Respiratória"
                    value={formik.values.respiratoryRate}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.respiratoryRate && formik.errors.respiratoryRate)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.respiratoryRate}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label="Temperatura"
                controlId="temperature"
            >
                <Form.Control
                    type="number"
                    min={1}
                    placeholder="Temperatura"
                    value={formik.values.temperature}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.temperature && formik.errors.temperature)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.temperature}
                </Form.Control.Feedback>
            </FloatingLabel>
            <Row className="mt-3">
                <Col>
                    <Stack gap={1}>
                        <Form.Check
                            id="febre"
                            name="symptoms"
                            label="Febre"
                            value="Febre"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="coriza"
                            name="symptoms"
                            label="Coriza"
                            value="Coriza"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="nariz_entupido"
                            name="symptoms"
                            label="Nariz entupido"
                            value="Nariz entupido"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="cansaco"
                            name="symptoms"
                            label="Cansaço"
                            value="Cansaço"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="tosse"
                            name="symptoms"
                            label="Tosse"
                            value="Tosse"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="dor_de_cabeca"
                            name="symptoms"
                            label="Dor de cabeça"
                            value="Dor de cabeça"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="dores_no_corpo"
                            name="symptoms"
                            label="Dores no corpo"
                            value="Dores no corpo"
                            onChange={formik.handleChange}
                        />
                    </Stack>
                </Col>
                <Col>
                    <Stack gap={1}>
                        <Form.Check
                            id="mal_estar_geral"
                            name="symptoms"
                            label="Mal estar geral"
                            value="Mal estar geral"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="dor_de_garganta"
                            name="symptoms"
                            label="Dor de garganta"
                            value="Dor de garganta"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="dificuldade_de_respirar"
                            name="symptoms"
                            label="Dificuldade de respirar"
                            value="Dificuldade de respirar"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="falta_de_paladar"
                            name="symptoms"
                            label="Falta de paladar"
                            value="Falta de paladar"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="falta_de_olfato"
                            name="symptoms"
                            label="Falta de olfato"
                            value="Falta de olfato"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="dificuldade_de_locomocao"
                            name="symptoms"
                            label="Dificuldade de locomoção"
                            value="Dificuldade de locomoção"
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            id="diarreia"
                            name="symptoms"
                            label="Diarreia"
                            value="Diarreia"
                            onChange={formik.handleChange}
                        />
                    </Stack>
                </Col>
            </Row>
            <Stack
                className="mt-3"
                direction="horizontal"
                gap={3}
            >
                <Button
                    type="submit"
                    disabled={loadingRequest}
                >
                    {loadingRequest ? "Finalizando Consulta..." : "Finalizar Consulta"}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={loadingRequest}
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
            </Stack>
        </Form>
    )
}