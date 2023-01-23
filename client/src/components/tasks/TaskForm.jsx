/*
const TaskForm = ({ createTaskRequest }) => {
    const onSubmit = (values, formikBag) => {
        createTaskRequest(values);
        formikBag.resetForm();
    };
    return (
        <Formik
            initialValues={{
                title: '',
                body: '',
                deadline: new Date(),
                isDone: false,
            }}
            onSubmit={onSubmit}>
            <Form>
                <Field name="title" placeholder="title" />
                <Field name="body" placeholder="body" />
                <Field name="deadline" placeholder="deadline" />
                <Field name="isDone" placeholder="isDone" />
                <button type="submit">Create task</button>
            </Form>
        </Formik>
    );
};

const mapDispatchToProps = dispatch => ({
    createTaskRequest: data => dispatch(tasksActions.createTaskRequest(data)),
});

export default connect(null, mapDispatchToProps)(TaskForm);
*/
