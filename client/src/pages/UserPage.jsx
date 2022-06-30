import { useDispatch } from 'react-redux';
import { Actions } from '../redux/actions';
import { UserList } from '../components/user/UserList';

export const UserPage = () => {
    const dispatch = useDispatch();
    const createUserAction = user => dispatch(Actions.getUsersRequest());

    return (
        <div>
            <UserList />
        </div>
    );
};
