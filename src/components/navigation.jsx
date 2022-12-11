import { FcMoneyTransfer, FcPhoneAndroid, FcList, FcKey, FcHome } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Navigation() {
    const navigate = useNavigate();
    const logout = useLogout();

    const { name } = useContext(UserContext);

    const signOut = async () => {
        await logout();
        navigate('/');
    }
    return(
        <div className="app-header header-shadow">
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__content">
                <div className="app-header-left">
                    <ul className="header-menu nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <i className="nav-link-icon"><FcHome /> </i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transfer" className="nav-link">
                                <i className="nav-link-icon"><FcMoneyTransfer /> </i>
                                Send Money
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/airtime" className="nav-link">
                                <i className="nav-link-icon"><FcPhoneAndroid /></i>
                                Airtime Topup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link">
                                <i className="nav-link-icon"><FcList /></i>
                                Transaction History
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/account" className="nav-link">
                                <i className="nav-link-icon"><FcKey /></i>
                                Account Details
                            </Link>
                        </li>
                    </ul>        
                </div>
                <div className="app-header-right">
                    <div className="header-btn-lg pr-0">
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left">
                                    <div className="btn-group">
                                        <Link data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                                            <img width="42" className="rounded-circle" src="logo192.png" alt="" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="widget-content-left  ml-3 header-user-info">
                                    <div className="widget-heading">
                                        {name}
                                    </div>
                                </div>
                                <div className="widget-content-right header-user-info ml-3">
                                    <button type="button" className="btn-shadow p-1 btn btn-danger btn-lg" onClick={signOut}>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )
}

export default Navigation;