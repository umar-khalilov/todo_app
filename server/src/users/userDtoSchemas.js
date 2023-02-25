'use strict';
const { isDate, parse } = require('date-fns');
const {
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    StringSchema,
} = require('yup');

const parseDateString = (value, originalValue) =>
    isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'yyyy-MM-dd', new Date());

const updateUserDtoSchema = new ObjectSchema({
    name: new StringSchema()
        .trim()
        .matches(/^[A-ZА-Я][a-zа-я]{3,255}$/, 'Enter a valid name')
        .notRequired(),
    surname: new StringSchema()
        .trim()
        .matches(/^[A-ZА-Я][a-zа-я]{3,255}$/, 'Enter a valid surname')
        .notRequired(),
    email: new StringSchema()
        .trim()
        .email('Email must be a valid email')
        .optional(),
    password: new StringSchema()
        .trim()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
            'Password have to contain minimum eight characters and maximum 32 characters, at least one upper case English letter, one lower case English letter, one number and one special character',
        )
        .optional(),
    birthday: new DateSchema()
        .transform(parseDateString)
        .max(new Date())
        .optional(),
    isMale: new BooleanSchema().optional(),
});

module.exports = { updateUserDtoSchema, parseDateString };
