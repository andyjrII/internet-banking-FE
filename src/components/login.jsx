import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import '../main.css';
import './components.css';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/auth/signin';

function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/user";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            setEmail('');
            setPassword('');
            localStorage.setItem('authTokens', JSON.stringify(accessToken))
            setAuth({ email, password, accessToken });
            navigate(from, { replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Email or Password');
            } else if (err.response?.status === 401 || err.response?.status === 403) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
            <div className="col-md-3 login">
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h5 className="card-title">Sign In</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-danger text-light">Email</span>
                                </div>
                                <input 
                                    type="text" id="email" ref={emailRef} autoComplete="off" 
                                    onChange={(e) => setEmail(e.target.value)} value={email} required 
                                    className="form-control"
                                />
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-danger text-light">Password</span>
                                </div>
                                <input 
                                    type="password" id="password" onChange={(e) => setPassword(e.target.value)} 
                                    value={password} maxLength="24" required className="form-control"
                                />
                            </div>
                            <br />
                            <button className='mt-1 btn btn-dark'>Sign In </button>
                            <br />
                            <p>
                                <span className="line">New to SMC Internet Banking? 
                                    <Link to="/register" className='text-danger'> Sign Up</Link>
                                </span>
                            </p> 
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default Login
