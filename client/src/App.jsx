import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, SignUpPage, SignInPage } from './pages';
import './App.css';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/sign-up' element={<SignUpPage />} />
                <Route path='/sign-in' element={<SignInPage />} />
            </Routes>
        </BrowserRouter>
    );
};  
