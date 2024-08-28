import moment from "moment";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { obterCorDaCondicao } from "../../lib/minhas-funcoes";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/app/types/patient";

interface ItemDaTabelaPacientesProps {
  paciente: Patient
}

export function ItemDaTabelaPacientes({
  paciente,
}: ItemDaTabelaPacientesProps) {
  const navigate = useNavigate()
  const hoje = moment()
  const dataDeNascimento = moment(paciente.dateOfBirth, "YYYY/MM/DD")
  const idadeDoPaciente = hoje.diff(dataDeNascimento, "year")
  const corDaCondicao = obterCorDaCondicao(paciente.currentCondition)

  return (
    <tr>
      <td className="align-middle">{paciente.id}</td>
      <td className="align-middle">{paciente.name}</td>
      <td className={`align-middle text-${corDaCondicao}`}>
        {paciente.currentCondition || "Nenhuma consulta foi feita"}
      </td>
      <td className="align-middle">{paciente.cpf}</td>
      <td className="align-middle">{idadeDoPaciente}</td>
      <td className="text-center align-middle">
        <Button className="w-75" onClick={() => navigate(`paciente/${paciente.id}`)}>
          <FaArrowRight />
        </Button>
      </td>
    </tr>
  );
}
