import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));

export const App = () => {
    return (
        <Router>
            <Suspense fallback='Todo application is loading...'>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='/sign-in' element={<SignInPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};
