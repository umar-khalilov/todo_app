import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { taskActions } from '../../../store/tasks/taskActions';

export const TaskForm = () => {
    const dispatch = useDispatch();
    const handleSubmit = (values, formikBag) => {
        dispatch(taskActions.createTaskRequest({ task: values }));
        formikBag.resetForm();
    };

    const values = {
        title: '',
        body: '',
        deadline: new Date(),
        files: [],
        isDone: false,
    };

    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>
            <Form>
                <Field name='title' placeholder='Title' />
                <Field name='body' placeholder='Body' />
                <Field name='deadline' type='date' placeholder='Deadline' />
                <Field name='files' placeholder='Files' />
                <Field name='isDone' placeholder='Is Done' />
                <Field type='submit'>Create task</Field>
            </Form>
        </Formik>
    );
};
