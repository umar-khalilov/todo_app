'use strict';
const {
    BooleanSchema,
    DateSchema,
    ObjectSchema,
    StringSchema,
} = require('yup');

const createTaskSchema = new ObjectSchema({
    title: new StringSchema()
        .trim()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid title')
        .max(300, 'No more than 300 characters')
        .required('title is required'),
    body: new StringSchema()
        .trim()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid body')
        .max(1000, 'No more than 1000 characters')
        .required('body is required'),
    deadline: new DateSchema().min(new Date()).required('deadline is required'),
    isDone: new BooleanSchema().notRequired(),
});

const updateTaskSchema = new ObjectSchema({
    title: new StringSchema()
        .trim()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid title')
        .max(300, 'No more than 300 characters')
        .optional(),
    body: new StringSchema()
        .trim()
        .matches(/^([a-zA-Z\d _-]+)$/, 'Enter a valid body')
        .max(1000, 'No more than 1000 characters')
        .optional(),
    deadline: new DateSchema().min(new Date()).optional(),
    isDone: new BooleanSchema().optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
