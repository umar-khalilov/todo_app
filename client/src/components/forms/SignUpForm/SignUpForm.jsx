import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import InputField from '../InputField/InputField';
import { SIGN_UP_SCHEMA } from '../../../utils/authValidationSchemas';
import styles from './SignUpForm.module.css';

const SignUpForm = props => {
    const values = {
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        birthday: '',
        isMale: undefined,
    };

    return (
        <Formik initialValues={values} onSubmit={props.onSubmit} validationSchema={SIGN_UP_SCHEMA}>
            <Form className={styles.baseContainer}>
                <Field name='name'>{fieldProps => <InputField {...fieldProps} placeholder='Name' />}</Field>
                <Field name='surname'>{fieldProps => <InputField {...fieldProps} placeholder='Surname' />}</Field>
                <Field name='email'>{fieldProps => <InputField {...fieldProps} placeholder='Email' />}</Field>
                <Field name='password'>{fieldProps => <InputField {...fieldProps} placeholder='Password' />}</Field>
                <Field name='passwordConfirmation'>
                    {fieldProps => <InputField {...fieldProps} placeholder='Password confirmation' />}
                </Field>
                <Field name='birthday'>{fieldProps => <InputField {...fieldProps} placeholder='Birthday' />}</Field>
                <Field name='isMale'>{fieldProps => <InputField {...fieldProps} placeholder='Is male' />}</Field>
                <Field className={styles.btnStyles} type='submit' value='Sign up' />
            </Form>
        </Formik>
    );
};

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
