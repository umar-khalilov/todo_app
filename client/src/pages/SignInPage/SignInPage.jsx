import { Header } from '../../components/Header/Header';
import { SignInForm } from '../../components/forms';
import styles from './SignInPage.module.css';

export const SignInPage = () => {
    const onSubmit = values => console.log(values);

    return (
        <>
            <Header />
            <main className={styles.baseContainer}>
                <h1 className={styles.headingStyles}>Sign in to your account</h1>
                <SignInForm onSubmit={onSubmit} />
            </main>
        </>
    );
};
