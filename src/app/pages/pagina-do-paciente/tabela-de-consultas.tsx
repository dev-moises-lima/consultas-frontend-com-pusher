import { useState } from "react"
import Table from "react-bootstrap/esm/Table"
import { ItemDaTabelaConsultas } from "./intem-da-tabela-consulta"
import { Col, Form, Row } from "react-bootstrap"

import { Consultation } from "@/app/types/Consultation"

interface Props {
  consultations: Consultation[] | undefined
}

export function TabelaDeConsultas({
  consultations
}: Props) {
  const [filter, setFilter] = useState("recentes") 

  let consultasComFiltro = consultations

  if(filter === "recentes") {
    consultasComFiltro = consultations?.slice().reverse()
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
          <Table className="m-0" striped bordered>
            <thead>
              <tr>
                <th>Resultado da consulta</th>
                <th>Pressõa arterial sistólica</th>
                <th>Pressõa arterial diastólica</th>
                <th>Frequência cardíaca</th>
                <th>Respiração</th>
                <th>Temperatura</th>
                <th>Data da consulta</th>
              </tr>
            </thead>
            <tbody>
              {consultasComFiltro!.map(consultation => (
                <ItemDaTabelaConsultas 
                  key={consultation.id}
                  consultation={consultation}
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </section>
  )
}