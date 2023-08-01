import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import { authActions } from '../../../store/authentication/authActions';
import { SIGN_IN_SCHEMA } from '../../../utils/authValidationSchemas';
import styles from './SignInForm.module.css';

export const SignInForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, formikBag) => {
        dispatch(authActions.authSignInRequest({ authData: values }));
        formikBag.resetForm();
    };
    const values = {
        email: '',
        password: '',
        'remember me': false,
    };

    return (
        <Formik initialValues={values} onSubmit={handleSubmit} validationSchema={SIGN_IN_SCHEMA}>
            <Form className={styles.signInContainer}>
                <Field name='email'>{fieldProps => <InputField {...fieldProps} placeholder='Email' />}</Field>
                <Field name='password'>
                    {fieldProps => <InputField {...fieldProps} type='password' placeholder='Password' />}
                </Field>
                <div className={styles.checkboxStyles}>
                    <label>
                        <Field type='checkbox' id='remember me' name='remember me' value='remember me' />
                        <span> Remeber Me!</span>
                    </label>
                    <a href='#' target='_blank' rel='noreferrer' className={styles.linkStyles}>
                        Forgot Password?
                    </a>
                </div>
                <Field className={styles.btnStyles} type='submit' value='Sign in' />
            </Form>
        </Formik>
    );
};
