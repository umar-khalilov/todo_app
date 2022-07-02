'use strict';
const { isDate, parse } = require('date-fns');
const {
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    StringSchema,
} = require('yup');

const nameSchema = new StringSchema()
    .optional()
    .matches(/^[A-ZА-Я][a-zа-я]{2,32}$/, 'Enter a valid name')
    .trim();

const parseDateString = (value, originalValue) =>
    isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'yyyy-MM-dd', new Date());

const userUpdateSchema = new ObjectSchema({
    name: nameSchema,
    surname: nameSchema,
    email: new StringSchema()
        .optional()
        .email('Email must be a valid email')
        .trim()
        .max(255),
    password: new StringSchema()
        .optional()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
            'Password have to contain an one big letter',
        )
        .trim(),
    birthday: new DateSchema()
        .optional()
        .transform(parseDateString)
        .max(new Date()),
    isMale: new BooleanSchema().optional(),
});

module.exports = { userUpdateSchema, parseDateString };
