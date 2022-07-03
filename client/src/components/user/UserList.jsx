import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/actions';
import { User } from './User';

export const UserList = props => {
    const { users, isFetching, error } = useSelector(({ users }) => users);
    const dispatch = useDispatch();
    console.log(users);
    useEffect(() => {
        dispatch(Actions.getUsersRequest());
    }, [dispatch]);

    return (
        <div>
            {isFetching && 'Loading....'}
            <span style={{ color: 'red' }}>
                {error && (
                    <>
                        {error.message}
                        <button onClick={() => dispatch(Actions.clearUserError())}>❌</button>
                    </>
                )}
            </span>
            {users.map(user => (
                <User {...user} key={user.id} />
            ))}
        </div>
    );
};
