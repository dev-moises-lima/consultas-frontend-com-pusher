import { PatientCondition } from "@/app/types/PatientCondition"

export function getConditionColor(condicao: PatientCondition) {
    switch (condicao) {
        case null:
            return "secondary"
        case "Sintomas insuficientes":
            return "success"
        case "Potencial infectado":
            return "warning"
        case "Possível infectado":
            return "danger"
    }
}