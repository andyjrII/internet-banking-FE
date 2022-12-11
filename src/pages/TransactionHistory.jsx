import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Navigation from '../components/navigation';
import Footer from "../components/footer";
import Sidebar from '../components/sidebar';
import { FcList } from "react-icons/fc";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const HISTORY_URL = '/transaction/history';

function TransactionHistory() {
    const { accountNumber } = useContext(UserContext);
    
    const errRef = useRef();

    const [transactions, setTransactions] = useState('');

    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transactionType, setTransactionType] = useState('');
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [status, startDate, endDate, transactionType])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(HISTORY_URL, 
                JSON.stringify({ 
                    accountNumber: accountNumber[0],
                    status, 
                    startDate, 
                    endDate,
                    transactionType
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setTransactions(response.data);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Wrong input');
            } else {
                setErrMsg('Error!')
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
                                        <i className="icon-gradient bg-mean-fruit"><FcList /></i>
                                    </div>
                                    <div>Transaction History</div>
                                </div>    
                            </div>
                        </div>  
                        <div className="row">          
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                                        <h5 className="card-title">Transaction History</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">From</span>
                                                    </div>
                                                    <input
                                                        type="date" id="startDate" className="form-control"
                                                        onChange={(e) => setStartDate(e.target.value)} value={startDate} required
                                                    />
                                                </div>
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">To</span>
                                                    </div>
                                                    <input
                                                        type="date" id="endDate" className="form-control"
                                                        onChange={(e) => setEndDate(e.target.value)} value={endDate} required
                                                    />
                                                </div>
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Status</span>
                                                    </div>
                                                    <select
                                                        id="status" className="form-control" name="status"
                                                        onChange={(e) => setStatus(e.target.value)} required
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="SUCCESSFUL">Successful</option>
                                                        <option value="FAILED">Failed</option>
                                                    </select>
                                                </div>
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Transaction Type</span>
                                                    </div>
                                                    <select
                                                        id="transactionType" className="form-control" name="transactionType"
                                                        onChange={(e) => setTransactionType(e.target.value)} required
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="DEBIT">Debit</option>
                                                        <option value="CREDIT">Credit</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br />
                                            <button className='mt-1 btn btn-dark'>Check</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body"><h5 className="card-title">{status} {transactionType}</h5>
                                        <table className="mb-0 table table-dark">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Transaction Date</th>
                                                <th>Transfered To</th>
                                                <th>Amount</th>
                                                <th>Description</th>
                                                <th>Particulars</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {(Object.keys(transactions).map((k, i) => {
                                                    return(
                                                    <tr key={i}>
                                                        <th scope="row">{parseInt(k) + 1}</th>
                                                        <td>{transactions[k].transactionDate}</td>
                                                        <td>{transactions[k].transferTo}</td>
                                                        <td><span>&#8358;</span>{transactions[k].amount}</td>
                                                        <td>{transactions[k].description}</td>
                                                        <td>{transactions[k].particulars}</td>
                                                    </tr>
                                                    )
                                                }))}
                                            </tbody>
                                        </table>
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

export default TransactionHistory;