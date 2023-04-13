import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';

const TaskForm = ({ createTaskRequest }) => {
    const onSubmit = (values, formikBag) => {
        createTaskRequest(values);
        formikBag.resetForm();
    };

    const values = {
        title: '',
        body: '',
        deadline: new Date(),
        isDone: false,
    };

    return (
        <Formik initialValues={values} onSubmit={onSubmit}>
            <Form>
                <Field name='title' placeholder='title' />
                <Field name='body' placeholder='body' />
                <Field name='deadline' placeholder='deadline' />
                <Field name='isDone' placeholder='isDone' />
                <Field type='submit'>Create task</Field>
            </Form>
        </Formik>
    );
};

TaskForm.propTypes = {
    createTaskRequest: PropTypes.func.isRequired,
};

// const mapDispatchToProps = dispatch => ({
//     createTaskRequest: data => dispatch(tasksActions.createTaskRequest(data)),
// });

// export default connect(null, mapDispatchToProps)(TaskForm);
