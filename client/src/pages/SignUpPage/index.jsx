import { Header } from '../../components/Header/Header';
import { SignUpForm } from '../../components/forms';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
    const onSubmit = values => console.log(values);

    return (
        <>
            <Header />
            <main className={styles.baseContainer}>
                <h1 className={styles.headingStyles}>CREATE AN ACCOUNT</h1>
                <h3 style={{ color: 'white', paddingBottom: '15px', fontWeight: 500 }}>
                    We always keep your name and email address private.
                </h3>
                <SignUpForm onSubmit={onSubmit} />
            </main>
        </>
    );
};

export default SignUpPage;
