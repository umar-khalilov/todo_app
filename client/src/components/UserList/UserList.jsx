import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from './User';
import { actions } from '../../redux/actions';

export const UserList = props => {
    const { users, error, isFetching } = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getUsersRequest({ page: 1, limit: 10 }));
    }, [dispatch]);

    return (
        <section>
            {isFetching && 'Loading...'}
            <span style={{ color: 'red' }}>
                {error && (
                    <>
                        {error.message}
                        <button
                            onClick={() => dispatch(actions.clearUserError())}>
                            X
                        </button>
                    </>
                )}
            </span>

            {users.map(user => (
                <User {...user} key={user.id} />
            ))}
        </section>
    );
};