'use strict';
const {
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    StringSchema,
} = require('yup');
const { parseDateString } = require('./userValidationSchemas');

const nameSchema = new StringSchema()
    .matches(/^[A-ZА-Я][a-zа-я]{3,32}$/, 'Enter a valid name')
    .trim()
    .required('Required');

const signUpSchema = new ObjectSchema({
    name: nameSchema,
    surname: nameSchema,
    email: new StringSchema()
        .email('email must be a valid email')
        .trim()
        .max(255)
        .required('email is required'),
    password: new StringSchema()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
            'password have to contain an one big letter',
        )
        .trim()
        .required('password is required'),
    birthday: new DateSchema().transform(parseDateString).max(new Date()),
    isMale: new BooleanSchema(),
});

const signInSchema = new ObjectSchema({
    email: new StringSchema()
        .email('email must be truly email')
        .trim()
        .required('email is required'),
    password: new StringSchema().trim().required('password is required'),
});

module.exports = { signUpSchema, signInSchema };
