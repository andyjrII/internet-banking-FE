import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Navigation from '../components/navigation';
import Footer from "../components/footer";
import Sidebar from '../components/sidebar';
import { FcMoneyTransfer } from "react-icons/fc";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const TRANSFER_URL = '/transaction/transfer';

function Transfer() {
    const { accountNumber, balance } = useContext(UserContext);
    const transferFrom = accountNumber[0];
    const [accountBalance, setAccountBalance] = balance;
    
    const transferToRef = useRef();
    const errRef = useRef();

    const [transferTo, setTransferTo] = useState('');
    const [pin, setPin] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        transferToRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [transferTo, pin, amount, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(TRANSFER_URL, 
                JSON.stringify({ 
                    transferFrom,
                    transferTo, 
                    pin, 
                    amount,
                    description
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setAccountBalance(response.data.fromBalance);
            window.alert(response.data.status);
            //clear state and controlled inputs
            setTransferTo('');
            setPin('')
            setAmount('');
            setDescription('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Invalid Pin or Account Number.');
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
                                        <i className="icon-gradient bg-mean-fruit"><FcMoneyTransfer /></i>
                                    </div>
                                    <div>Send Money</div>
                                </div>    
                            </div>
                        </div> 
                        <div className="row">           
                            <div className="col-md-6">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                                        <h5 className="card-title">Send Money</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-danger text-light">Beneficiary's Account</span>
                                                </div>
                                                <input
                                                    type="text" id="transferTo" ref={transferToRef} autoComplete="off"
                                                    onChange={(e) => setTransferTo(e.target.value)} value={transferTo} required
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
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text bg-danger text-light">
                                                        Description
                                                    </span>
                                                </div>
                                                <input
                                                    type="text" id="description" className="form-control"
                                                    onChange={(e) => setDescription(e.target.value)} value={description}
                                                />
                                            </div>
                                            <br />
                                            <button className='mt-1 btn btn-dark'>Send</button>
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

export default Transfer