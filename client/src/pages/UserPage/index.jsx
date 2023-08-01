import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserForm } from '../../components/forms/UserForm/UserForm';
import { User } from './User';
import { userActions } from '../../store/users/userActions';

export const UserPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(userActions.getUserRequest());
    }, [dispatch]);
    return (
        <>
            <UserForm />
            <User />
        </>
    );
};
