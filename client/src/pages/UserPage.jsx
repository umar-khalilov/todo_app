import { UserList } from '../components/users/UserList';
import { UserForm } from '../components/users/UserForm';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/actions';

export const UserPage = () => {
    const dispatch = useDispatch();
    const updateUserAction = (userData, userId) =>
        dispatch(actions.updateUserRequest({ userData, userId }));
    return (
        <>
            <UserForm submitHandler={updateUserAction} />
            <UserList />
        </>
    );
};
