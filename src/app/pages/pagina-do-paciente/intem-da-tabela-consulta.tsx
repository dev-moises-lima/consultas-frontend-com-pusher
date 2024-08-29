import moment from "moment"
import { calcularStatusDaCondicao, obterCorDaCondicao } from "../../lib/minhas-funcoes"
import { Consultation } from "@/app/types/Consultation"

interface ItemDaTabelaConsultasProps {
  consultation: Consultation
}

export function ItemDaTabelaConsultas({
  consultation
} : ItemDaTabelaConsultasProps) {

  const corDaCondicao = obterCorDaCondicao(consultation.condition)
  const statusDaPressaoArterialDiastolica = calcularStatusDaCondicao("pressao arterial diastólica", consultation.diastolicBloodPressure)
  const statusDaPressaoArterialSistolica = calcularStatusDaCondicao("pressao arterial sistólica", consultation.systolicBloodPressure)
  const statusDaFrequenciaCardiaca = calcularStatusDaCondicao("frequência cardíaca", consultation.heartRate)
  const statusDaRespiracao = calcularStatusDaCondicao("respiracao", consultation.respiratoryRate)
  const statusDaTemperatura = calcularStatusDaCondicao("temperatura", consultation.temperature)

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