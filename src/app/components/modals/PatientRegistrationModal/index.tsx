import Modal, { ModalProps } from "react-bootstrap/Modal"
import PatientRegistrationForm from "@/app/components/forms/PatientRegistrationForm"
import { Patient } from "@/app/types/patient"

type Props = ModalProps & {
	onCancel: () => void
	onSuccess: (patient: Patient) => void
}

export default function PatientRegistrationModal({onCancel, onSuccess, ...rest} : Props)
{
	return (
		<Modal 
			{...rest}
		>
			<Modal.Header>
				<Modal.Title>
					Formulário de Cadastro de Paciente
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PatientRegistrationForm
					onSuccess={onSuccess}
					onCancel={onCancel}
				/>
			</Modal.Body>
		</Modal>
	)
}