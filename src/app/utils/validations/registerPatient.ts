import moment from "moment";
import * as Yup from "yup"
import { cpf } from "cpf-cnpj-validator"

export const registerPatientValidationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório!"),
    cpf: Yup.string().required("O CPF é obrigatório!")
      .test("cpfIsValid", "O CPF é inválido!", (value) => {
        return cpf.isValid(value)
      }),
    dateOfBirth: Yup.string().required("A data de nascimento é obrigatório!")
      .test('dateIsValid', "A data é inválida!", (value) => {
        if(value.length !== 10) return false

        const date = moment(value, "DD/MM/YYYY")
        const now = moment()
        return date.isValid() && date.isBefore(now, "day")
      }),
    telephone: Yup.string().required("Telefone é obrigatório!").min(15, "Telefone inválido"),
    photo: Yup.mixed<File>().required("A foto é obrigatória!")
      .test('fileType', 'Formato de arquivo não suportado', (value) => {
        return ['image/jpeg', 'image/png'].includes(value.type)
      })
      .test('fileSize', 'O arquivo é muito grande', (value) => {
        return value.size <= 2 * 1024 * 1024
      }),
  })