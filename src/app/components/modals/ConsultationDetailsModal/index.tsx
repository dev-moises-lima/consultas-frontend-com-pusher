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
	const corDaCondicao = getConditionColor(consultation.condition)
  const statusDaPressaoArterialDiastolica = calculateConditionStatus("pressao arterial diastólica", consultation.diastolicBloodPressure)
  const statusDaPressaoArterialSistolica = calculateConditionStatus("pressao arterial sistólica", consultation.systolicBloodPressure)
  const statusDaFrequenciaCardiaca = calculateConditionStatus("frequência cardíaca", consultation.heartRate)
  const statusDaRespiracao = calculateConditionStatus("respiracao", consultation.respiratoryRate)
  const statusDaTemperatura = calculateConditionStatus("temperatura", consultation.temperature)

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
						Resultado da Consulta: <span className={`text-${corDaCondicao}`}>{consultation.condition}</span>
					</div>
					<div className="d-flex justify-content-between">
						<span><span className={`text-${corDaCondicao}`}>{consultation.percentageOfSymptomsFelt}%</span> dos sintomas sentidos</span><span>Realizada em {moment(consultation.created_at).format("DD/MM/YYYY")}</span>
					</div>
				</div>
				<div className="mb-3">
					<div className="fs-5">Sinais Vitais:</div>
					<div>
						Pressão Arterial Diastólica: <span className={`text-${statusDaPressaoArterialDiastolica[1]}`}>{consultation.diastolicBloodPressure} mmHg ({statusDaPressaoArterialDiastolica[0]})</span>
					</div>
					<div>
						Pressão Arterial Sistólica: <span className={`text-${statusDaPressaoArterialSistolica[1]}`}>{consultation.systolicBloodPressure} mmHg ({statusDaPressaoArterialSistolica[0]})</span>
					</div>
					<div>
						Frequência Cardíaca: <span className={`text-${statusDaFrequenciaCardiaca[1]}`}>{consultation.heartRate} bpm ({statusDaFrequenciaCardiaca[0]})</span>
					</div>
					<div>
						Frequência Respiratória: <span className={`text-${statusDaRespiracao[1]}`}>{consultation.respiratoryRate} irpm ({statusDaRespiracao[0]})</span>
					</div>
					<div>
						Temperatura: <span className={`text-${statusDaTemperatura[1]}`}>{consultation.temperature} °C ({statusDaTemperatura[0]})</span>
					</div>
				</div>
				{consultation.symptoms.length ? (
					<div>
						<div className="fs-5 mb-1">Sintomas que o paciente apresentou:</div>
						<div className="d-flex flex-wrap gap-2">
							{consultation.symptoms.map(symptom => (
								<div key={symptom} className="p-1 rounded text-bg-primary">{symptom}</div>
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