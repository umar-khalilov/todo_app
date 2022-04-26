const { parse, isDate } = require('date-fns');
const {
    ObjectSchema,
    StringSchema,
    DateSchema,
    BooleanSchema,
} = require('yup');

module.exports = class AuthValidationSchemas {
    static signUpSchema() {
        const nameSchema = new StringSchema()
            .matches(/^[A-ZА-Я][a-zа-я]{3,32}$/, 'Enter a valid name')
            .trim()
            .required();
        const parseDateString = (value, originalValue) =>
            isDate(originalValue)
                ? originalValue
                : parse(originalValue, 'yyyy-MM-dd', new Date());

        return new ObjectSchema({
            name: nameSchema,
            surname: nameSchema,
            email: new StringSchema()
                .email('Email must be a valid email')
                .trim()
                .max(255)
                .required('Email is required'),
            password: new StringSchema()
                .matches(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
                    'Password have to contain an one big letter',
                )
                .trim()
                .required('Required'),
            birthday: new DateSchema()
                .transform(parseDateString)
                .max(new Date()),
            isMale: new BooleanSchema(),
        });
    }

    static signInSchema() {
        return new ObjectSchema({
            email: new StringSchema()
                .email('Email must be truly email')
                .trim()
                .required('Email is required'),
            password: new StringSchema().trim().required('Required'),
        });
    }
};
