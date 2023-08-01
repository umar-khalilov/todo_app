import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from './Task';
import { taskActions } from '../../store/tasks/taskActions';

export const TaskList = () => {
    const { tasks, isFetching, error } = useSelector(({ task }) => task);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(taskActions.getTasksRequest());
    }, [dispatch]);

    return (
        <section>
            {isFetching && 'LOADING'}
            {error && JSON.stringify(error, null, 4)}
            <h1>Task List</h1>

            {tasks.map(task => (
                <Task {...task} key={task.id} />
            ))}
        </section>
    );
};
