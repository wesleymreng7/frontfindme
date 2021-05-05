import * as yup from 'yup'

export const CreateSchema = yup.object().shape({
    name: yup
        .string()
        .required('Campo nome é obrigatório')
        .trim()
        .max(45, 'O número máximo de caracteres é 45'),
    email: yup.string().required('Campo e-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Campo senha é obrigatório')
})

export const UpdateSchema = yup.object().shape({
    name: yup
        .string()
        .required('Campo nome é obrigatório')
        .trim()
        .max(45, 'O número máximo de caracteres é 45'),
    email: yup.string().required('Campo e-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Campo senha é obrigatório')
})

export default { CreateSchema, UpdateSchema }
