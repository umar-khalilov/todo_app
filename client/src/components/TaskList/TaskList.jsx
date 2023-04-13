import PropTypes from 'prop-types';

const TaskList = ({ tasks, isFetching, error, removeTask, updateTask }) => {
    return (
        <section>
            {isFetching && 'LOADING'}
            {error && JSON.stringify(error, null, 4)}
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>ID: {task.id}</h2>
                            <p>{task.body}</p>
                            <input
                                type='checkbox'
                                checked={task.isDone}
                                onChange={({ target: { checked } }) => updateTask({ isDone: checked })}
                            />
                        </div>
                        <button onClick={() => removeTask(task.id)}>Delete task</button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    removeTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
};

const mapStateToProps = ({ tasks }) => ({
    tasks,
});

// const mapDispatchToProps = dispatch => ({
//     removeTask: id => dispatch(tasksActions.removeTask(id)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
