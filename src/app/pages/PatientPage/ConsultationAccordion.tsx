import { Consultation } from "@/app/types/Consultation"
import { Patient } from "@/app/types/Patient"
import AccordionBody from "react-bootstrap/AccordionBody"
import AccordionHeader from "react-bootstrap/AccordionHeader"
import Accordion from "react-bootstrap/Accordion"
import AccordionItem from "react-bootstrap/AccordionItem"
import { Badge } from "react-bootstrap"

type Props = {
    consultations: Consultation[]
}

export function ConsultationAccordion({
    consultations
}: Props) {
    return (
        <Accordion
            className="bg-text-info"
        >
            {consultations.map(consultation => (
                <AccordionItem
                    key={consultation.id}
                    eventKey={consultation.id.toString()}
                >
                    <AccordionHeader >
                        <div className="w-100 d-flex justify-content-between">
                            <div>{consultation.condition}</div>
                            <div>{consultation.heartRate}</div>
                        </div>
                    </AccordionHeader>
                    <AccordionBody>

                        {consultation.symptoms.map(symptom => (
                            <Badge bg="secondary" key={symptom}>{symptom}</Badge>
                        ))}
                    </AccordionBody>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
