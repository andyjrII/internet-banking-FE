import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Navigation from '../components/navigation';
import Footer from "../components/footer";
import Sidebar from '../components/sidebar';
import { FcPhoneAndroid } from "react-icons/fc";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const AIRTIME_URL = '/transaction/airtime';

function AirtimeTopup() {
    const { accountNumber, balance } = useContext(UserContext);
    const [accountBalance, setAccountBalance] = balance;
    
    const phoneNumberRef = useRef();
    const errRef = useRef();

    const payFrom = accountNumber[0];
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pin, setPin] = useState('');
    const [amount, setAmount] = useState('');
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        phoneNumberRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber, pin, amount])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(AIRTIME_URL, 
                JSON.stringify({ 
                    payFrom,
                    phoneNumber, 
                    pin, 
                    amount
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setAccountBalance(response.data.fromBalance)
            window.alert(response.data.status);
            //clear state and controlled inputs
            setPhoneNumber('');
            setPin('')
            setAmount('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Incorrect Pin');
            } else {
                setErrMsg('Transaction Failed!')
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
                                        <i className="icon-gradient bg-mean-fruit"><FcPhoneAndroid /></i>
                                    </div>
                                    <div>Airtime Topup</div>
                                </div>    
                            </div>
                        </div>  
                        <div className="row">          
                            <div className="col-md-6">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                                        <h5 className="card-title">Airtime Topup</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-danger text-light">Phone Number</span>
                                                </div>
                                                <input
                                                    type="tel" id="phoneNumber" ref={phoneNumberRef} autoComplete="off"
                                                    onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required
                                                    className="form-control"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-row">
                                                <div className="col-md-6 input-group" >
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Amount</span>
                                                    </div>
                                                    <input
                                                        type="number" id="amount" onChange={(e) => setAmount(e.target.value)}
                                                        value={amount} className="form-control" required
                                                    />
                                                </div>
                                                <div className="col-md-6 input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">
                                                            Pin
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="password" id="pin" onChange={(e) => setPin(e.target.value)}
                                                        value={pin} className="form-control" required
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <button className='mt-1 btn btn-dark'>Recharge</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content bg-grow-early">
                                    <div className="widget-content-wrapper text-white">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Account Balance</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-white"><span><span>&#8358;</span>{accountBalance}</span></div>
                                        </div>
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

export default AirtimeTopup;