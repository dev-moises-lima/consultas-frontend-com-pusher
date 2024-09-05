import moment from "moment";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { getConditionColor } from "@/app/utils/functions/getConditionColor";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/app/types/Patient";

interface PatientTableRowProps {
  paciente: Patient
}

export function ItemDaTabelaPacientes({
  paciente: patient,
}: PatientTableRowProps) {
  const navigate = useNavigate()
  const today = moment()
  const dateOfBirth = moment(patient.dateOfBirth, "YYYY/MM/DD")
  const patientAge = today.diff(dateOfBirth, "year")
  const colorOfCondition = getConditionColor(patient.currentCondition)

  return (
    <tr>
      <td className="align-middle">{patient.id}</td>
      <td className="align-middle">{patient.name}</td>
      <td className={`align-middle text-${colorOfCondition}`}>
        {patient.currentCondition || "Nenhuma consulta foi feita"}
      </td>
      <td className="align-middle">{patient.cpf}</td>
      <td className="align-middle">{patientAge}</td>
      <td className="text-center align-middle">
        <Button className="w-75" onClick={() => navigate(`patient`, {state: patient})}>
          <FaArrowRight />
        </Button>
      </td>
    </tr>
  );
}
