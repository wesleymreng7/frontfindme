import * as yup from 'yup'

export const CreateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo nome é obrigatório')
    .trim()
    .max(45, 'O número máximo de caracteres é 45'),
})

export const UpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo nome é obrigatório')
    .trim()
    .max(45, 'O número máximo de caracteres é 45'),
})

export default { CreateSchema, UpdateSchema }
