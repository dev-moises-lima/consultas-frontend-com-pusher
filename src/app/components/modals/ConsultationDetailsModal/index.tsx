import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";

import { Consultation } from "@/app/types/Consultation";
import { calculateConditionStatus } from "@/app/utils/functions/calculateConditionStatus";
import { getConditionColor } from "@/app/utils/functions/getConditionColor";

type Props = ModalProps & {
	consultation: Consultation
}

export function ConsultationDetailsModal({consultation, ...rest}: Props) {
	const colorOfCondition = getConditionColor(consultation.condition)
	const diastolicBloodPressureStatus = calculateConditionStatus("pressao arterial diastólica", consultation.diastolicBloodPressure)
	const systolicBloodPressureStatus = calculateConditionStatus("pressao arterial sistólica", consultation.systolicBloodPressure)
	const heartRateStatus = calculateConditionStatus("frequência cardíaca", consultation.heartRate)
	const breathingStatus = calculateConditionStatus("respiracao", consultation.respiratoryRate)
	const temperatureStatus = calculateConditionStatus("temperatura", consultation.temperature)

	return (
		<Modal {...rest} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>
					Detalhes da Consulta
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="">
				<div className="mb-3">
					<div  className="fs-4">
						Resultado da Consulta: <span className={`text-${colorOfCondition}`}>{consultation.condition}</span>
					</div>
					<div className="d-flex justify-content-between">
						<span><span className={`text-${colorOfCondition}`}>{consultation.percentageOfSymptomsFelt}%</span> dos sintomas sentidos</span><span>Realizada em {moment(consultation.created_at).format("DD/MM/YYYY")}</span>
					</div>
				</div>
				<div className="mb-3">
					<div className="fs-5">Sinais Vitais:</div>
					<div>
						Pressão Arterial Diastólica: <span className={`text-${diastolicBloodPressureStatus[1]}`}>{consultation.diastolicBloodPressure} mmHg ({diastolicBloodPressureStatus[0]})</span>
					</div>
					<div>
						Pressão Arterial Sistólica: <span className={`text-${systolicBloodPressureStatus[1]}`}>{consultation.systolicBloodPressure} mmHg ({systolicBloodPressureStatus[0]})</span>
					</div>
					<div>
						Frequência Cardíaca: <span className={`text-${heartRateStatus[1]}`}>{consultation.heartRate} bpm ({heartRateStatus[0]})</span>
					</div>
					<div>
						Frequência Respiratória: <span className={`text-${breathingStatus[1]}`}>{consultation.respiratoryRate} irpm ({breathingStatus[0]})</span>
					</div>
					<div>
						Temperatura: <span className={`text-${temperatureStatus[1]}`}>{consultation.temperature} °C ({temperatureStatus[0]})</span>
					</div>
				</div>
				{consultation.symptoms.length ? (
					<div>
						<div className="fs-5 mb-1">Sintomas que o paciente apresentou:</div>
						<div className="d-flex flex-wrap gap-2">
							{consultation.symptoms.map(symptom => (
								<div key={symptom} className="p-2 rounded text-bg-primary">{symptom}</div>
							))}
						</div>
					</div>
				) : (
					<div className="fs-5">O paciente não apresentou nenhum sintoma</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={rest.onHide}>Fechar</Button>
			</Modal.Footer>
		</Modal>
	)
}