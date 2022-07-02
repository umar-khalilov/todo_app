import { useDispatch } from 'react-redux';
import { Actions } from '../../redux/actions';

export const User = ({ id, name, surname, email, birthday, isMale }) => {
    const dispatch = useDispatch();
    const deleteHandler = () => dispatch(Actions.deleteUserRequest({ id }));

    return (
        <article>
            <ul>
                <li>
                    {name}&nbsp;{surname}
                </li>
                <li>{email}</li>
                <li>{birthday}</li>
                <li>{isMale}</li>
            </ul>
            <button onClick={deleteHandler}>Delete User</button>
        </article>
    );
};
