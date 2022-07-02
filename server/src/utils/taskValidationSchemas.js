'use strict';
const {
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    StringSchema,
} = require('yup');

const taskCreateSchema = new ObjectSchema({
    title: new StringSchema()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid title')
        .trim()
        .max(300, 'No more than 300 characters')
        .required('title is required'),
    body: new StringSchema()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid body')
        .trim()
        .max(1000, 'No more than 1000 characters')
        .required('body is required'),
    deadline: new DateSchema().min(new Date()).required('deadline is required'),
    isDone: new BooleanSchema().notRequired(),
});

const taskUpdateSchema = new ObjectSchema({
    title: new StringSchema()
        .optional()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid title')
        .trim()
        .max(300, 'No more than 300 characters')
        .required('title is required'),
    body: new StringSchema()
        .optional()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid body')
        .trim()
        .max(1000, 'No more than 1000 characters')
        .required('body is required'),
    deadline: new DateSchema().optional().min(new Date()),
    isDone: new BooleanSchema().optional(),
});

module.exports = { taskCreateSchema, taskUpdateSchema };
