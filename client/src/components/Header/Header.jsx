import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
    const isOpen = document.location.pathname === '/sign-up';

    return (
        <header className={styles.container}>
            <Link to='/'>
                <img src='vite.svg' alt='logo' />
            </Link>
            <Link to={isOpen ? '/sign-in' : '/sign-up'} className={styles.authLink}>
                {isOpen ? 'Sign in' : 'Sign up'}
            </Link>
        </header>
    );
};
