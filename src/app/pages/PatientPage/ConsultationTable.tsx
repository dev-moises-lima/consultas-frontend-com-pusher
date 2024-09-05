import { useState } from "react"
import Table from "react-bootstrap/esm/Table"
import { ConsultationTableRow } from "./ConsultationTableRow"
import { Col, Form, Row } from "react-bootstrap"

import { Consultation } from "@/app/types/Consultation"

interface Props {
  consultations: Consultation[] | undefined
  selectConsultationForDetails: (consultation: Consultation) => void
}

export function ConsultationTable({
  consultations,
  selectConsultationForDetails
}: Props) {
  const [filter, setFilter] = useState("recentes") 

  let consultationsWithFilter = consultations

  if(filter === "recentes") {
    consultationsWithFilter = consultations?.slice().reverse()
  }

  return (
    <section className="p-4 bg-secondary-subtle rounded-2 mt-3">
      {consultations === undefined ? (
        <h2 className="text-center text-info">Carregando Consultas...</h2>
      ) : consultations.length === 0 ? (
        <h2 className="text-center text-info">Nenhuma consulta foi realizada ainda.</h2>
      ) : (
        <>
          <Row className="justify-content-between mb-2">
            <Col xs={8}>
              <span className="h2">Consultas Realizadas</span>
            </Col>
            <Col>
              <Form.Select 
                size="sm" 
                aria-label="Default select example"
                onChange={event => setFilter(event.currentTarget.value)}
              >
                <option  value={"recentes"}>Mais recentes</option>
                <option  value={"antigas"}>Mais antigas</option>
              </Form.Select>
            </Col>
          </Row>
          <Table className="m-0" striped bordered hover>
            <thead>
              <tr>
                <th>Resultado da consulta</th>
                <th>Data da consulta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {consultationsWithFilter!.map(consultation => (
                <ConsultationTableRow 
                  key={consultation.id}
                  consultation={consultation}
                  selectConsultationForDetails={selectConsultationForDetails}
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </section>
  )
}
