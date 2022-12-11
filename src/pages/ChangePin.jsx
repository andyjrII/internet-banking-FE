import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Navigation from '../components/navigation';
import Footer from "../components/footer";
import Sidebar from '../components/sidebar';
import { FcKey } from "react-icons/fc";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom' 

const CHANGE_PIN_URL = '/account/update';
const PIN_REGEX = /[0-9]{4}$/;

function ChangePin() {
    const navigate = useNavigate();
    const to = "/user";

    const { accountId } = useContext(UserContext);
    const id = accountId[0];
    const oldPinRef = useRef();
    const errRef = useRef();

    const [oldPin, setOldPin] = useState('');

    const [newPin, setNewPin] = useState('');
    const [validNewPin, setValidNewPin] = useState(false);
    const [newPinFocus, setNewPinFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setValidNewPin(PIN_REGEX.test(newPin));
    }, [newPin])

    useEffect(() => {
        setErrMsg('');
    }, [newPin])

    const handleSubmit = async (e) => {
        console.log(accountId);
        e.preventDefault();
        try {
            const response = await axios.patch(CHANGE_PIN_URL, 
                JSON.stringify({ 
                    id,
                    oldPin, 
                    newPin
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            window.alert(response.data);
            navigate(to, { replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Invalid Pin!');
            } 
            errRef.current.focus();
        }
    }

    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <Navigation />
            <div className="app-main">
                <Sidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <div className="app-page-title">
                            <div className="page-title-wrapper">
                                <div className="page-title-heading">
                                    <div className="page-title-icon">
                                        <i className="icon-gradient bg-mean-fruit"><FcKey /></i>
                                    </div>
                                    <div>Change Transaction Pin</div>
                                </div>    
                            </div>
                        </div> 
                        <div className="row">           
                            <div className="col-md-4">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                                        <h5 className="card-title">Change Pin <FcKey /></h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-danger text-light">Old Pin</span>
                                                </div>
                                                <input
                                                    type="password" id="oldPin" autoComplete="off" className="form-control"
                                                    onChange={(e) => setOldPin(e.target.value)} value={oldPin} required  
                                                    ref={oldPinRef} 
                                                />
                                            </div>
                                            <br />
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-dark text-light">
                                                        New Pin
                                                        <FontAwesomeIcon icon={faCheck} className={validNewPin ? "valid" : "hide"} />
                                                        <FontAwesomeIcon icon={faTimes} className={validNewPin || !newPin ? "hide" : "invalid"} />
                                                    </span>
                                                </div>
                                                <input
                                                    type="password" id="newPin" onChange={(e) => setNewPin(e.target.value)}
                                                    value={newPin} className="form-control" required 
                                                    onFocus={() => setNewPinFocus(true)} onBlur={() => setNewPinFocus(false)}
                                                />
                                            </div>
                                            <p id="uidnote" className={newPinFocus && newPin && !validNewPin ? "instructions" : "offscreen"}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                Pin must be 4-digit number.
                                            </p>
                                            <br />
                                            <button 
                                                className='mt-1 btn btn-dark'
                                                disabled={ !validNewPin ? true : false }
                                            >Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ChangePin;