const { parse, isDate } = require('date-fns');
const {
    ObjectSchema,
    StringSchema,
    DateSchema,
    BooleanSchema,
} = require('yup');

module.exports = class ValidationSchemas {
    static #isDate = isDate;
    static #parse = parse;
    static #nameSchema = new StringSchema()
        .matches(/^[A-ZА-Я][a-zа-я]{3,32}$/, 'Enter a valid name')
        .required();

    static #parseDateString = (value, originalValue) =>
        this.#isDate(originalValue)
            ? originalValue
            : this.#parse(
                  originalValue,
                  'yyyy-MM-dd',
                  new Date(0, 0, 0, 0, 0, 0, 0),
              );

    static signUpSchema = () =>
        new ObjectSchema({
            name: this.#nameSchema,
            surname: this.#nameSchema,
            email: new StringSchema()
                .email('Email must be truly email')
                .lowercase('Email must be in lovercase')
                .required('Required'),
            password: new StringSchema()
                .matches(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
                    'Password have to contain an one big letter',
                )
                .required('Required'),
            birthday: new DateSchema()
                .nullable()
                .transform(this.#parseDateString)
                .max(new Date()),
            isMale: new BooleanSchema().nullable(),
        });

    static signInSchema = () =>
        new ObjectSchema({
            email: new StringSchema()
                .email('Email must be truly email')
                .required('Required'),
            password: new StringSchema().required('Required'),
        });
};
