const { parse, isDate } = require('date-fns');
const {
    ObjectSchema,
    StringSchema,
    DateSchema,
    BooleanSchema,
} = require('yup');

module.exports = class UserValidationSchemas {
    static userUpdateSchema() {
        const nameSchema = new StringSchema()
            .optional()
            .matches(/^[A-ZА-Я][a-zа-я]{3,32}$/, 'Enter a valid name')
            .trim();
        const parseDateString = (value, originalValue) =>
            isDate(originalValue)
                ? originalValue
                : parse(originalValue, 'yyyy-MM-dd', new Date());

        return new ObjectSchema({
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
    }
};
