import moment from "moment"
import { calculateConditionStatus } from "@/app/utils/functions/calculateConditionStatus"
import { Consultation } from "@/app/types/Consultation"
import { getConditionColor } from "@/app/utils/functions/getConditionColor"
import { Button } from "react-bootstrap"

interface ConsultationTableRowProps {
  consultation: Consultation
  selectConsultationForDetails: (consultation: Consultation) => void
}

export function ConsultationTableRow({
  consultation,
  selectConsultationForDetails
} : ConsultationTableRowProps) {
  const corDaCondicao = getConditionColor(consultation.condition)

  return (
    <tr>
      <td className={`text-${corDaCondicao}`}>{consultation.condition}</td>
      <td>{moment(consultation.created_at).format("DD/MM/YYYY")}</td>
      <td className="text-center">
        <Button 
          onClick={() => selectConsultationForDetails(consultation)}
        >
          Detalhes
        </Button>
      </td>
    </tr>
  )
}