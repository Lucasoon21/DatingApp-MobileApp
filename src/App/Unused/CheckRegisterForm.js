import * as Yup from 'yup';
export const CheckRegisterForm = Yup.object().shape({
    email: Yup.string().email('Nieprawidlowy mail').required('email jest wymagany'),
    password: Yup.string().trim().min(6, 'Haslo jest za krotkie').required('haslo jest wymagane'),
    confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Hasla sa rozne')
})