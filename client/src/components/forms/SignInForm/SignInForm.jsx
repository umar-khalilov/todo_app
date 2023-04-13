import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import InputField from '../InputField/InputField';
import { SIGN_IN_SCHEMA } from '../../../utils/authValidationSchemas';
import styles from './SignInForm.module.css';

const SignInForm = ({ signIn }) => {
    const values = {
        email: '',
        password: '',
        'remember me': false,
    };
    const handleSubmit = (values, formikBag) => {
        signIn(values);
        formikBag.resetForm();
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

SignInForm.propTypes = {
    signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    signIn: values => dispatch(values),
});

export default connect(null, mapDispatchToProps)(SignInForm);
