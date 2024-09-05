import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Stack from 'react-bootstrap/Stack'
import { useFormik } from "formik"
import { registerPatientIniialValues } from '@/app/utils/initialValues/registerPatient'
import { registerPatientValidationSchema } from '@/app/utils/validations/registerPatient'
import { useMask } from '@react-input/mask'
import { api } from "@/app/service/api"
import { Patient } from '@/app/types/Patient'
import Swal from "sweetalert2"

interface Props {
    onCancel: () => void
    onSuccess: (patient: Patient) => void
}

export default function PatientRegistrationForm ({
    onCancel,
    onSuccess
}: Props)
{
    const [loadingRequest, setLoadingRequest] = useState(false)

    const formik = useFormik({
        initialValues: registerPatientIniialValues,
        validationSchema: registerPatientValidationSchema,
        onSubmit: async (values, { setErrors }) => {
            setLoadingRequest(true)
            const arrayOfValues = Object.entries(values)

            const dados = arrayOfValues.reduce((dados, currentValue) => {
                const [chave, valor] = currentValue

                if(chave === "dateOfBirth") {
                    dados.append(chave, (valor as string).split("/").reverse().join("/"))
                    return dados
                }

                dados.append(chave, valor)
                return dados
            }, new FormData())

            try {
                const response = await api.post("/patients", dados)
                onSuccess(response.data as Patient)
                setLoadingRequest(false)
                Swal.fire({
                    title: "Paciente Cadastrado!",
                    text: "O paciente foi cadastrado com sucesso!",
                    icon: "success",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    confirmButtonAriaLabel: "Ok!"
                })
            } catch (error: any) {
                console.log(error);
                
                const errors = error.response.data.errors
                setErrors(errors)
                setLoadingRequest(false)
            }
        }
    })

    const cpfRef = useMask({ 
        mask: "___.___.___-__", 
        replacement: { _: /\d/ }
    })

    const dateRef = useMask({
        mask: "dd/mm/aaaa",
        replacement: { d: /\d/, m: /\d/, a: /\d/ },
    })

    const telephoneRef = useMask({
        mask: "(__) 9____-____",
        replacement: { _: /\d/ },
    })

    return (
        <Form 
            onSubmit={formik.handleSubmit}
        >
            <Form.Group
                controlId='name'
            >
                <Form.Label>Nome:</Form.Label>
                <Form.Control 
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.name && formik.errors.name)}
                />
                <Form.Control.Feedback type='invalid'>
                    {formik.errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                controlId='cpf'
            >
                <Form.Label>CPF:</Form.Label>
                <Form.Control
                    ref={cpfRef}
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.cpf && formik.errors.cpf)}
                />
                <Form.Control.Feedback type='invalid'>
                    {formik.errors.cpf}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                controlId='dateOfBirth'
            >
                <Form.Label>Data de nascimento:</Form.Label>
                <Form.Control
                    ref={dateRef}
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
                />
                <Form.Control.Feedback type='invalid'>
                    {formik.errors.dateOfBirth}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                controlId='telephone'
            >
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                    ref={telephoneRef}
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    isInvalid={!!(formik.touched.telephone && formik.errors.telephone)}
                />
                <Form.Control.Feedback type='invalid'>
                    {formik.errors.telephone}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                controlId='photo'
            >
                <Form.Label>Foto:</Form.Label>
                <Form.Control
                    type='file' 
                    accept=".jpg, .png, .jpeg"
                    onChange={(event) => {
                        const file = (event.currentTarget as HTMLInputElement).files?.[0]
                        formik.setFieldValue('photo', file)
                    }}
                    isInvalid={!!(formik.touched.photo && formik.errors.photo)}
                />
                <Form.Control.Feedback type='invalid'>
                    {formik.errors.photo}
                </Form.Control.Feedback>
            </Form.Group>
            <Stack
                className='mt-2'
                gap={2}
                direction='horizontal'
            >
                <Button
                    className="mt-2"
                    type="submit"
                    disabled={loadingRequest}
                >
                    {loadingRequest ? "Cadastrando..." : "Cadastrar"}
                </Button>
                <Button
                    className="mt-2"
                    type="button"
                    variant="secondary"
                    disabled={loadingRequest}
                    onClick={() => {
                        formik.resetForm()
                        onCancel()
                    }}
                >
                    Cancelar
                </Button>
            </Stack>
        </Form>
    )
}