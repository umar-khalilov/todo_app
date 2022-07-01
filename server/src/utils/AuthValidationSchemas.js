import { isDate, parse } from 'date-fns';
import { BooleanSchema, DateSchema, ObjectSchema, StringSchema } from 'yup';

export class AuthValidationSchemas {
    signUpSchema() {
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
            birthday: new DateSchema()
                .transform(parseDateString)
                .max(new Date()),
            isMale: new BooleanSchema(),
        });
    }

    signInSchema() {
        return new ObjectSchema({
            email: new StringSchema()
                .email('email must be truly email')
                .trim()
                .required('email is required'),
            password: new StringSchema()
                .trim()
                .required('password is required'),
        });
    }
}
