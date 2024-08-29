export function transformForSearch(texto: string) {
    return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
    .replace(/ç/g, "c")              // Remove cedilhas
    .replace(/\s/g, "")             
  }
