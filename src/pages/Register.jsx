import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom' 
import '../components/components.css';
import HomeNavigation from "../components/home-nav";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/signup';

function Register() {
    const navigate = useNavigate();
    const to = "/";

    const accountRef = useRef();
    const errRef = useRef();

    const [account, setAccount] = useState('');
    const [pin, setPin] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirm, setValidConfirm] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        accountRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirm(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [account, pin, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = PASSWORD_REGEX.test(password);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            console.log("Account: ", account,  pin, password)
            await axios.patch(REGISTER_URL, 
                JSON.stringify({ 
                    accountNumber: account, 
                    pin, 
                    password
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            window.alert('Registration Successful!');
            navigate(to, { replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Invalid Pin or Account Number.');
            } else {
                setErrMsg('Registration Failed!')
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            <HomeNavigation />
            <div className="col-md-3 register">
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                        <h5 className="card-title">Sign Up</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-danger text-light">Account Number</span>
                                </div>
                                <input
                                    type="text" id="accountNumber" ref={accountRef} autoComplete="off"
                                    onChange={(e) => setAccount(e.target.value)} value={account} required
                                    className="form-control"
                                />
                            </div>
                            <br />
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-danger text-light">Transaction Pin</span>
                                </div>
                                <input
                                    type="password" id="pin" onChange={(e) => setPin(e.target.value)}
                                    value={pin} className="form-control" required
                                />
                            </div>
                            <br />
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-dark text-light">
                                        Password
                                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                                    value={password} className="form-control" required 
                                    aria-invalid={validPassword ? "false" : "true"} aria-describedby="passwordnote"
                                    onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}
                                />
                                <p 
                                    id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} 
                                />
                                    8 to 24 characters.<br />
                                    Must include uppercase & lowercase letters, a number & a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <br />
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-dark text-light">
                                        Confirm Password:
                                        <FontAwesomeIcon icon={faCheck} className={validConfirm && confirmPassword ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validConfirm || !confirmPassword ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="password" id="confirmPassword" className="form-control"
                                    onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                                    required aria-invalid={validConfirm ? "false" : "true"}
                                    aria-describedby="confirmnote" onFocus={() => setConfirmFocus(true)}
                                    onBlur={() => setConfirmFocus(false)}
                                />
                                <p id="confirmnote" className={confirmFocus && !validConfirm ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>
                            </div>
                            <br />
                            <button disabled={!validPassword || !validConfirm ? true : false} className='mt-1 btn btn-dark'>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-2 text-center card text-danger card-body bg-white welcome">
                <h1 class="text-danger card-title">NOTE</h1>
                To register for internet banking, you must have a bank account.<br /> 
                <Link to="/create-account" className="text-light btn btn-dark">Open Account</Link>
            </div>
        </div>
    )
}

export default Register