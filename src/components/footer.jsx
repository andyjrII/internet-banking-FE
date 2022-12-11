import { Link } from "react-router-dom";

function Footer() {
    return(
        <div 
            className="app-wrapper-footer"
            
        >
            <div className="app-footer">
                <div className="app-footer__inner">
                    <div className="app-footer-left">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/transfer" className="nav-link">
                                    Send Money
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/airtime" className="nav-link">
                                    Airtime Topup
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="app-footer-right">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/history" className="nav-link">
                                    Transaction History
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/account" className="nav-link">
                                    Account Details
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;