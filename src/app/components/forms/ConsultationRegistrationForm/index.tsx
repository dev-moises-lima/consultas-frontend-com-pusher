import { useState } from "react"

import Form, { FormProps } from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useFormik } from "formik"
import Swal from "sweetalert2"

import { registerConsultationIniialValues } from "@/app/utils/initialValues/registerConsultation"
import { registerConsultationValidationSchema } from "@/app/utils/validations/registerCnsultation"
import { api } from "@/app/service/api"
import { Consultation } from "@/app/types/Consultation"
import { calculateConditionStatus } from "@/app/utils/functions/calculateConditionStatus"

type Props = FormProps & {
    patientId: number
    onCancel: () => void
    onSuccess: (consultation: Consultation) => void
}

export default function ConsultationRegistrationForm({
    patientId,
    onCancel,
    onSuccess,
    ...rest
}: Props) {
    const [loadingRequest, setLoadingRequest] = useState(false)
    
    const formik = useFormik({
        initialValues: registerConsultationIniialValues,
        validationSchema: registerConsultationValidationSchema,
        async onSubmit({symptoms, temperature, ...rest}, { setErrors }) {
            const restWhithRound = Object.entries(rest).reduce((previousValue, currentValue) => {
                previousValue[currentValue[0]] = Math.round(currentValue[1]!)
                return previousValue
            }, {} as any)

            try {
                setLoadingRequest(true)

                const { data } = await api.post(`patients/${patientId}/consultations`, {
                    ...restWhithRound,
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
                    },
                    confirmButtonAriaLabel: "Ok!"
                })
            } catch (error: any) {
                console.log(error)
                const errors = error.response.data.errors
                setErrors(errors)
                setLoadingRequest(false)
            }
        }
    })

	const diastolicBloodPressureStatus = calculateConditionStatus("pressao arterial diastólica", formik.values.diastolicBloodPressure)
	const systolicBloodPressureStatus = calculateConditionStatus("pressao arterial sistólica", formik.values.systolicBloodPressure)
	const heartRateStatus = calculateConditionStatus("frequência cardíaca", formik.values.heartRate)
	const breathingStatus = calculateConditionStatus("respiracao", formik.values.respiratoryRate)
	const temperatureStatus = calculateConditionStatus("temperatura", formik.values.temperature)

    return (
        <Form onSubmit={formik.handleSubmit} {...rest}>
            <FloatingLabel
                className="mb-3"
                label={(<>
                    Pressão Arterial Diastólica {diastolicBloodPressureStatus.length > 0 && (
                        <span className={`text-${diastolicBloodPressureStatus[1]}`}>
                            {`(${diastolicBloodPressureStatus[0]})`}
                        </span>
                    )}
                </>)}
                controlId="diastolicBloodPressure"
            >                    
                <Form.Control
                    autoFocus
                    type="number"
                    placeholder="Pressão Arterial Diastólica"
                    value={formik.values.diastolicBloodPressure || ""}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.diastolicBloodPressure && formik.errors.diastolicBloodPressure)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.diastolicBloodPressure}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label={(<>
                    Pressão Arterial Sistólica {systolicBloodPressureStatus.length > 0 && (
                        <span className={`text-${systolicBloodPressureStatus[1]}`}>
                            {`(${systolicBloodPressureStatus[0]})`}
                        </span>
                    )}
                </>)}
                controlId="systolicBloodPressure"
            >
                <Form.Control
                    type="number"
                    placeholder="Pressão Arterial Sistólica"
                    value={formik.values.systolicBloodPressure || ""}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.systolicBloodPressure && formik.errors.systolicBloodPressure)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.systolicBloodPressure}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label={(<>
                    Frequência Cardíaca {heartRateStatus.length > 0 && (
                        <span className={`text-${heartRateStatus[1]}`}>
                            {`(${heartRateStatus[0]})`}
                        </span>
                    )}
                </>)}
                controlId="heartRate"
            >
                <Form.Control
                    type="number"
                    placeholder="Frequência Cardíaca"
                    value={formik.values.heartRate || ""}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.heartRate && formik.errors.heartRate)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.heartRate}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label={(<>
                    Frequência Respiratória {breathingStatus.length > 0 && (
                        <span className={`text-${breathingStatus[1]}`}>
                            {`(${breathingStatus[0]})`}
                        </span>
                    )}
                </>)}
                controlId="respiratoryRate"
            >
                <Form.Control
                    type="number"
                    placeholder="Frequência Respiratória"
                    value={formik.values.respiratoryRate || ""}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.respiratoryRate && formik.errors.respiratoryRate)}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.respiratoryRate}
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label={(<>
                    Temperatura {temperatureStatus.length > 0 && (
                        <span className={`text-${temperatureStatus[1]}`}>
                            {`(${temperatureStatus[0]})`}
                        </span>
                    )}
                </>)}
                controlId="temperature"
            >
                <Form.Control
                    type="number"
                    placeholder="Temperatura"
                    value={formik.values.temperature || ""}
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