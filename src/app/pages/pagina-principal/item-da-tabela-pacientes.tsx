import moment from "moment";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { obterCorDaCondicao } from "../../lib/minhas-funcoes";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/app/types/Patient";

interface ItemDaTabelaPacientesProps {
  paciente: Patient
}

export function ItemDaTabelaPacientes({
  paciente: patient,
}: ItemDaTabelaPacientesProps) {
  const navigate = useNavigate()
  const hoje = moment()
  const dataDeNascimento = moment(patient.dateOfBirth, "YYYY/MM/DD")
  const idadeDoPaciente = hoje.diff(dataDeNascimento, "year")
  const corDaCondicao = obterCorDaCondicao(patient.currentCondition)

  return (
    <tr>
      <td className="align-middle">{patient.id}</td>
      <td className="align-middle">{patient.name}</td>
      <td className={`align-middle text-${corDaCondicao}`}>
        {patient.currentCondition || "Nenhuma consulta foi feita"}
      </td>
      <td className="align-middle">{patient.cpf}</td>
      <td className="align-middle">{idadeDoPaciente}</td>
      <td className="text-center align-middle">
        <Button className="w-75" onClick={() => navigate(`patient/${patient.id}`, {state: patient})}>
          <FaArrowRight />
        </Button>
      </td>
    </tr>
  );
}
