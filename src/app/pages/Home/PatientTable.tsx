import { useState } from "react"

import Table from "react-bootstrap/Table"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import { IoIosSearch } from "react-icons/io"

import { transformForSearch } from "@/app/utils/functions/transformForSearch" 
import { Patient } from "@/app/types/Patient"
import { PatientTableRow } from "./PatientTableRow"

interface TabelaDePacientesProps {
  patients: Patient[] | undefined
}

export function PatientTable({ 
  patients 
}: TabelaDePacientesProps) {
  const [filtro, setFiltro] = useState("")

  let filteredPatients: Patient[] = []

  if (patients) {
    filteredPatients = patients.slice()
  }

  if (filtro) {
    filteredPatients = filteredPatients.filter((patient) => {
      return transformForSearch(patient.name).includes(filtro)
    })
  }

  return (
    <div className="p-3 p-md-4 bg-secondary-subtle rounded-2 mt-4">
      {patients === undefined ? (
        <h2 className="text-center text-info">Carregando Pacientes...</h2>
      ) : patients.length === 0 ? (
        <h2 className="text-center text-info">Nenhum paciente cadastrado</h2>
      ) : (
        <>
          <Row className="mb-4">
            <Col xs={4}>
              <InputGroup>
                <Form.Control
                  className="col-2"
                  placeholder="Pesquisar por nome"
                  aria-label="Pesquisar"
                  name="filtro"
                  onChange={(event) =>
                    setFiltro(transformForSearch(event.target.value))
                  }
                />
                <InputGroup.Text>
                  <IoIosSearch className="text-primary fs-5" />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Table className="m-0" striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome completo do Paciente</th>
                <th>Condição</th>
                <th>CPF</th>
                <th>Idade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.reverse().map((patient) => (
                <PatientTableRow key={patient.id} paciente={patient} />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
