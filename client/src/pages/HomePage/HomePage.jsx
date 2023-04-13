import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export const HomePage = () => {
    return (
        <main className={styles.baseContainer}>
            <a href='#' target='_blank' rel='noreferrer' className={styles.linkStyles}>
                <h1 style={{ color: 'white' }}>Неповторимый оригинал!</h1>
            </a>
            <div>
                <h1 style={{ paddingBottom: '20px', color: '#9c6441' }}>Жалкая пародия...</h1>
                <Link to='/sign-in' className={styles.linkStyles}>
                    Sign In
                </Link>
                <Link to='/sign-up' className={styles.linkStyles}>
                    Sign Up
                </Link>
            </div>
        </main>
    );
};
