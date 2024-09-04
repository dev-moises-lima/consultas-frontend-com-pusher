type condition = "pressao arterial diastólica" | "pressao arterial sistólica" | "frequência cardíaca" | "respiracao" | "temperatura"

export function calculateConditionStatus(currentCondition: condition, value: number | undefined) {
  if(!value) {
    return []
  }
  
  switch (currentCondition) {
    case "pressao arterial sistólica":
      if(value < 60) {
        return ["Hipotenso", "warning"]
      }
      if(value <= 85) {
        return ["Normotenso", "success"]
      }
      if(value <= 89) {
        return ["Normotenso Limitrofe", "info"]
      }
      if(value <= 99) {
        return ["Hipertenso Leve", "warning"]
      }
      if(value <= 109) {
        return ["Hipertenso Moderado", "danger"]
      }
      if(value >= 110) {
        return ["Hipertenso Grave", "danger"]
      }
      break
    case "pressao arterial diastólica":
      if(value < 90) {
        return ["Hipotenso", "warning"]
      }
      if(value <= 130) {
        return ["Normotenso", "success"]
      }
      if(value <= 139) {
        return ["Normotenso Limitrofe", "info"]
      }
      if(value <= 159) {
        return ["Hipertenso Leve", "warning"]
      }
      if(value <= 179) {
        return ["Hipertenso Moderado", "danger"]
      }
      if(value >= 180) {
        return ["Hipertenso Grave", "danger"]
      }
      break
    case "frequência cardíaca":
      if(value < 60) {
        return ["Brandicárdico", "warning"]
      }
      if(value <= 100) {
        return ["Normocárdico", "success"]
      }
      if(value > 100) {
        return ["Taquicárdico", "danger"]
      }
      break
    case "respiracao":
      if(value < 14) {
        return ["Brandipnéico", "warning"]
      }
      if(value <= 20) {
        return ["Eupnéico", "success"]
      }
      if(value > 20) {
        return ["Taquipnéico", "danger"]
      }
      break
    case "temperatura":
      if(value < 35) {
        return ["Hipotermia", "warning"]
      }
      if(value < 36.1) {
        return ["Baixa Normal", "info"]
      }
      if(value <= 37.2) {
        return ["Afebril", "success"]
      }
      if(value <= 37.7) {
        return ["Feblil", "warning"]
      }
      if(value <= 38.9) {
        return ["Febre", "danger"]
      }
      if(value <= 40) {
        return ["Pirexia", "danger"]
      }
      if(value > 40) {
        return ["Hiperpirexia", "danger"]
      }
      break
  }

  return ["Classificação nâo identificada", "secondary"]
}
