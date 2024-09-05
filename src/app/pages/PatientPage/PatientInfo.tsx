import { Col, Row, Image, Stack, Badge, Placeholder } from "react-bootstrap";
import { PatientCondition } from "@/app/types/PatientCondition";
import moment from "moment";
import { useState } from "react";
import { getConditionColor } from "@/app/utils/functions/getConditionColor";
import { Patient } from "@/app/types/Patient";

interface PatientInfoProps {
  patient: Patient
  sectionRef: React.MutableRefObject<null>
}

export function PatientInfo({
  patient,
  sectionRef
} : PatientInfoProps) {
  const [fotoCarregada, setFotoCarregada] = useState(false)
  
  const today = moment()
  const dateOfBirth = moment(patient.dateOfBirth , "YYYY/MM/DD")
  const patientAge = today.diff(dateOfBirth, "year")
  const colorOfCondition = getConditionColor(patient.currentCondition)
  
  return (
    <section ref={sectionRef} className="p-3 bg-info-subtle rounded-2">
      <Row className="align-items-center">
        <Col xs={9} className="border-3">
        <Stack gap={3}>
          <Row>
            <Col>
              <div className="fs-5 text-info">
                Nome Do paciente
              </div>
              <div className="fs-4 fw-semibold">
                {patient.name}
              </div>
            </Col>
            <Col>
              <div className="fs-5 text-info">
                ID
              </div>
              <div className="fs-4">
                <Badge >
                  {patient.id}
                </Badge>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="fs-5 text-info">
                Idade
              </div>
              <div className="fs-4 fw-semibold">
                {patientAge}
              </div>
            </Col>
            <Col>
              <div className="fs-5 text-info">
                Resultado da Última Consulta
              </div>
              <div className={`fs-4 text-${colorOfCondition} fw-semibold`}>
                {patient.currentCondition || "Nenhuma consulta realizada"}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="fs-5 text-info">
                CPF
              </div>
              <div className="fs-4 fw-semibold">
                {patient.cpf}
              </div>
            </Col>
            <Col>
              <div className="fs-5 text-info">
                Telefone
              </div>
              <div className="fs-4 fw-semibold">
                {patient.telephone}
              </div>
            </Col>
          </Row>
        </Stack>
        </Col>
        <Col>
          <Placeholder
            className={`bg-transparent d-${fotoCarregada ? "none" : "block"}`}>
            <Image
              fluid
              roundedCircle
              src="https://placehold.co/300x300?text=Foto"
              aria-hidden="true"
            />
          </Placeholder>
          <Image
            className={`d-${fotoCarregada ? "block" : "none"}`}
            roundedCircle
            fluid
            src={patient.photoUrl}
            onLoad={() => setFotoCarregada(true)}
          />
        </Col>
      </Row>
    </section>
  )
}