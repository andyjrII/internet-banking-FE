import { Link } from "react-router-dom";
import { FcMoneyTransfer, FcPhoneAndroid, FcList, FcKey, FcHome } from "react-icons/fc";

function Sidebar() {
    return(
        <div className="app-sidebar sidebar-shadow">
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
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>    
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        <li className="app-sidebar__heading">Quick Links</li>
                        <li>
                            <Link to="/user">
                                <i className="metismenu-icon"><FcHome /></i>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/transfer">
                                <i className="metismenu-icon"><FcMoneyTransfer /></i>
                                Send Money
                            </Link>
                        </li>
                        <li>
                            <Link to="/airtime">
                                <i className="metismenu-icon"><FcPhoneAndroid /></i>
                                Airtime Topup
                            </Link>
                        </li>
                        <li>
                            <Link to="/history">
                                <i className="metismenu-icon"><FcList /></i>
                                Transaction History
                            </Link>
                        </li>
                        <li>
                            <Link to="/update-account">
                                <i className="metismenu-icon"><FcKey /></i>
                                Change Pin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;