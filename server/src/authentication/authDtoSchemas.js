'use strict';
const {
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    StringSchema,
} = require('yup');

const { parseDateString } = require('../users/userDtoSchemas');

const signUpDtoSchema = new ObjectSchema({
    name: new StringSchema()
        .trim()
        .matches(/^[A-ZА-Я][a-zа-я]{3,255}$/, 'Enter a valid name')
        .required('name is required'),
    surname: new StringSchema()
        .trim()
        .matches(/^[A-ZА-Я][a-zа-я]{3,255}$/, 'Enter a valid surname')
        .required('surname is required'),
    email: new StringSchema()
        .trim()
        .email('Email must be a valid email')
        .max(255)
        .required('email is required'),
    password: new StringSchema()
        .trim()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
            'Password have to contain minimum eight characters and maximum 32 characters, at least one upper case English letter, one lower case English letter, one number and one special character',
        )
        .required('password is required'),
    birthday: new DateSchema()
        .transform(parseDateString)
        .max(new Date())
        .optional(),
    isMale: new BooleanSchema().optional(),
});

const signInDtoSchema = new ObjectSchema({
    email: new StringSchema()
        .trim()
        .email('email must be truly email')
        .required('email is required'),
    password: new StringSchema().trim().required('password is required'),
});

module.exports = { signUpDtoSchema, signInDtoSchema };
