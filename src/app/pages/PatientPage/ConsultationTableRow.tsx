import moment from "moment"
import { calculateConditionStatus } from "@/app/utils/functions/calculateConditionStatus"
import { Consultation } from "@/app/types/Consultation"
import { getConditionColor } from "@/app/utils/functions/getConditionColor"

interface ConsultationTableRowProps {
  consultation: Consultation
}

export function ItemDaTabelaConsultas({
  consultation
} : ConsultationTableRowProps) {

  const corDaCondicao = getConditionColor(consultation.condition)
  const statusDaPressaoArterialDiastolica = calculateConditionStatus("pressao arterial diastólica", consultation.diastolicBloodPressure)
  const statusDaPressaoArterialSistolica = calculateConditionStatus("pressao arterial sistólica", consultation.systolicBloodPressure)
  const statusDaFrequenciaCardiaca = calculateConditionStatus("frequência cardíaca", consultation.heartRate)
  const statusDaRespiracao = calculateConditionStatus("respiracao", consultation.respiratoryRate)
  const statusDaTemperatura = calculateConditionStatus("temperatura", consultation.temperature)

  return (
    <tr>
      <td className={`text-${corDaCondicao}`}>{consultation.condition}</td>
      <td className={`text-${statusDaPressaoArterialSistolica[1]}`}>{statusDaPressaoArterialSistolica[0]}</td>
      <td className={`text-${statusDaPressaoArterialDiastolica[1]}`}>{statusDaPressaoArterialDiastolica[0]}</td>
      <td className={`text-${statusDaFrequenciaCardiaca[1]}`}>{statusDaFrequenciaCardiaca[0]}</td>
      <td className={`text-${statusDaRespiracao[1]}`}>{statusDaRespiracao[0]}</td>
      <td className={`text-${statusDaTemperatura[1]}`}>{statusDaTemperatura[0]}</td>
      <td>{moment(consultation.created_at).format("DD/MM/YYYY")}</td>
    </tr>
  )
}