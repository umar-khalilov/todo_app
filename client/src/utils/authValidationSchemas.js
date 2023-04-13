import * as Yup from 'yup';

const SIGN_IN_SCHEMA = Yup.object({
    email: Yup.string().trim().email('email must be a valid value').required('email is required'),
    password: Yup.string().trim().required('password is required'),
});

const SIGN_UP_SCHEMA = Yup.object({
    name: Yup.string()
        .matches(/^[A-ZА-Я][a-zа-я]{3,255}$/, 'Enter a valid name')
        .required('name is required'),
    surname: Yup.string()
        .matches(/^[A-ZА-Я][a-zа-я]{3,255}$/, 'Enter a valid surname')
        .required('surname is required'),
    email: Yup.string().trim().email('Email must be a valid email').max(255).required('email is required'),
    password: Yup.string()
        .trim()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
            'Password have to contain minimum eight characters and maximum 32 characters, at least one upper case English letter, one lower case English letter, one number and one special character',
        )
        .required('password is required'),
    passwordConfirmation: Yup.string()
        .trim()
        .oneOf([Yup.ref('password')], 'passwords must match')
        .required('passwordConfirmation is required'),
    birthday: Yup.date().max(new Date()).optional(),
    isMale: Yup.boolean().optional(),
});

export { SIGN_UP_SCHEMA, SIGN_IN_SCHEMA };
