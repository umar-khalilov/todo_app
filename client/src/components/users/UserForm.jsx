import { Field, Form, Formik } from 'formik';

export const UserForm = ({ submitHandler }) => {
    const onSubmit = (values, formikBag) => {
        submitHandler(values);
        formikBag.resetForm();
    };
    const values = {
        name: '',
        surname: '',
        email: '',
        isMale: undefined,
        password: '',
    };
    return (
        <Formik initialValues={values} onSubmit={onSubmit}>
            <Form>
                <Field name="name" placeholder="name" />
                <Field name="surname" placeholder="surname" />
                <Field name="email" placeholder="email" />
                <Field name="isMail" placeholder="is male" />
                <Field name="password" placeholder="password" />
                <button type="submit">Update data</button>
            </Form>
        </Formik>
    );
};
