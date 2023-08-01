import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/users/userActions';

export const UserForm = () => {
    const dispatch = useDispatch();
    const handleSubmit = (values, formikBag) => {
        // dispatch(userActions.updateUserRequest({,values}));
        formikBag.resetForm();
    };
    const values = {
        name: '',
        surname: '',
        email: '',
        avatar: '',
        birthday: '',
        isMale: false,
        password: '',
    };

    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>
            <Form>
                <Field name='name' placeholder='Name' />
                <Field name='surname' placeholder='Surname' />
                <Field name='email' placeholder='Email' />
                <Field name='avatar' placeholder='Avatar' />
                <Field name='isMail' placeholder='Is male' />
                <Field name='password' placeholder='Password' />
                <Field type='submit'>Update</Field>
            </Form>
        </Formik>
    );
};
