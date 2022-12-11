import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import '../components/components.css';
import HomeNavigation from "../components/home-nav";
import { useNavigate } from 'react-router-dom'

const NAME_REGEX = /[A-z-]{3,20}$/; 
const EMAIL_REGEX = /$/;
const PHONE_NUMBER_REGEX = /[0-9]{11}$/; 
const PIN_REGEX = /[0-9]{4}$/;
const CREATE_ACCOUNT_URL = '/account/create';

function CreateAccount() {
    const navigate = useNavigate();
    const to = "/register";

    const firstNameRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [picture, setPicture] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [accountType, setAccountType] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [pin, setPin] = useState('');
    const [validPin, setValidPin] = useState(false);
    const [pinFocus, setPinFocus] = useState(false);

    const [matchPin, setMatchPin] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        firstNameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhoneNumber(PHONE_NUMBER_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        setValidPin(PIN_REGEX.test(pin));
        setValidMatch(pin === matchPin);
    }, [pin, matchPin])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, picture, birthDate, gender, email, phoneNumber, address, accountType, pin, matchPin])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = NAME_REGEX.test(firstName);
        const v3 = NAME_REGEX.test(lastName);
        const v4 = EMAIL_REGEX.test(email);
        const v5 = PHONE_NUMBER_REGEX.test(phoneNumber);
        const v6 = PIN_REGEX.test(pin);
        if (!v1 || !v3 || !v4 || !v5 || !v6) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(CREATE_ACCOUNT_URL,
                JSON.stringify({ 
                    firstName, lastName, profilePicture: picture, dateOfBirth: birthDate, gender, email, 
                    phoneNumber, address, accountType, pin 
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            window.alert(response.data);
            navigate(to, { replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Address already exists!');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
        <HomeNavigation />
        <div className="col-md-4 create-account">
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h5 className="card-title">Open Account</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark text-light">
                                    First Name
                                    <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                                </span>
                            </div>
                            <input
                                type="text" id="firstName" ref={firstNameRef} className="form-control"
                                onChange={(e) => setFirstName(e.target.value)} value={firstName} required
                                aria-invalid={validFirstName ? "false" : "true"} aria-describedby="uidnote"
                                onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)}
                            />
                        </div>
                        <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Name Can't be less than 3 letters.<br />
                            Cannot contain a number or a special Character except hyphen.<br />
                        </p>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark text-light">
                                    Last Name
                                    <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                                </span>
                            </div>
                            <input
                                type="text" id="lastName" onChange={(e) => setLastName(e.target.value)}
                                value={lastName} required aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="uidnote" onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)} className="form-control"
                            />
                        </div>
                        <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Name Can't be less than 3 letters.<br />
                            Cannot contain a number or a special Character except hyphen.<br />
                        </p>
                        <br />
                        <label htmlFor="picture" className="form-label">
                            Profile Picture:
                        </label>
                        <div className="input-group">
                            <input 
                                type="file" id="picture" onChange={(e) => setPicture(e.target.value)} 
                                value={picture} className="form-control-file"
                            />
                        </div>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-danger text-light">
                                    Date of Birth
                                </span>
                            </div>
                            <input 
                                type="date" id="birthDate" onChange={(e) => setBirthDate(e.target.value)} value={birthDate} 
                                className="form-control" required 
                            />
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="gender">Gender:</label>
                                <div role="group">
                                    <label className="btn btn-danger">
                                        <input 
                                            type="radio" name="gender" id="male"
                                            value='MALE' onChange={(e) => setGender(e.target.value)}
                                        />
                                        Male
                                    </label>
                                    <label className="btn btn-danger">
                                        <input 
                                            type="radio" name="gender" id="female" 
                                            value='FEMALE' onChange={(e) => setGender(e.target.value)}
                                        />
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="accountType">Account Type:</label>
                                <div role="group">
                                    <label className="btn btn-danger">
                                        <input 
                                            type="radio" name="accountType" id="savings"   
                                            value="SAVINGS" onChange={(e) => setAccountType(e.target.value)}
                                        />
                                        Savings
                                    </label>
                                    <label className="btn btn-danger">
                                        <input 
                                            type="radio" name="accountType" id="current"  
                                            value="CURRENT" onChange={(e) => setAccountType(e.target.value)}
                                        />
                                        Current
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark text-light">
                                    E-mail
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                </span>
                            </div>
                            <input
                                type="text" id="email" onChange={(e) => setEmail(e.target.value)} className="form-control"
                                value={email} required aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
                            />
                        </div>
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Invalid E-mail address.
                        </p>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark text-light">
                                    Phone Number
                                    <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
                                </span>
                            </div>
                            <input
                                type="tel" id="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber} required aria-invalid={validPhoneNumber ? "false" : "true"}
                                aria-describedby="uidnote" onFocus={() => setPhoneNumberFocus(true)}
                                onBlur={() => setPhoneNumberFocus(false)} className="form-control"
                            />
                        </div>
                        <p id="uidnote" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be 11-digit numbers.
                        </p>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-danger text-light">
                                    Address
                                </span>
                            </div>
                            <input 
                                type="text" id="address" onChange={(e) => setAddress(e.target.value)} 
                                value={address} className="form-control" required
                            />
                        </div>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-dark text-light">
                                    Pin
                                    <FontAwesomeIcon icon={faCheck} className={validPin ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPin || !pin ? "hide" : "invalid"} />
                                </span>
                            </div>
                            <input
                                type="password" id="pin" onChange={(e) => setPin(e.target.value)} required
                                value={pin} aria-invalid={validPin ? "false" : "true"} aria-describedby="pinnote"
                                onFocus={() => setPinFocus(true)} onBlur={() => setPinFocus(false)} className="form-control"
                            />
                        </div>
                        <p id="pinnote" className={pinFocus && !validPin ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 digits.<br />
                            Numbers only.
                        </p>
                        <br />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-danger text-light">
                                Confirm Pin
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPin ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPin ? "hide" : "invalid"} />
                                </span>
                            </div>
                            <input
                                type="password" id="confirm_pin" onChange={(e) => setMatchPin(e.target.value)}
                                value={matchPin} required aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)} className="form-control"
                            />
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first Pin input field.
                        </p>
                        <br />
                        <button 
                            disabled={
                                !validFirstName || !validLastName || !validEmail || !validPhoneNumber || 
                                !validPin || !validMatch ? true : false
                            }
                            className='mt-1 btn btn-dark' type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-2 card text-danger text-center card-body bg-white welcome">
            <h1 class="text-danger card-title">NOTE</h1>
            Take note of your Account Number as you would need it to Register for Online Banking.
        </div>
    </div>
    )
}

export default CreateAccount 