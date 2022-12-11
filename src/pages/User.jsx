import Navigation from '../components/navigation';
import Footer from "../components/footer";
import Sidebar from '../components/sidebar';
import { FcBusinessman } from "react-icons/fc";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function User() {
    const { accountNumber, balance, accountType } = useContext(UserContext);

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
                                        <i className="icon-gradient bg-mean-fruit"><FcBusinessman /></i>
                                    </div>
                                    <div>User's Dashboard</div>
                                </div>    
                            </div>
                        </div>            
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content bg-midnight-bloom">
                                    <div className="widget-content-wrapper text-white">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Account Type</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-white"><span>{accountType}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content bg-arielle-smile">
                                    <div className="widget-content-wrapper text-white">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Account Number</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-white"><span>{accountNumber}</span></div>
                                        </div>
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
                                            <div className="widget-numbers text-white"><span><span>&#8358;</span>{balance}</span></div>
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

export default User;