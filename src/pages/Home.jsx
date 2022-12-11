import HomeNavigation from "../components/home-nav";
import Login from "../components/login";
import '../main.css'


function Home() {
    return (
        <div>
            <HomeNavigation />
            <div className="col-md-3 card text-danger card-body bg-white welcome">
                <h1 className="text-danger card-title">WELCOME TO SMC BANK</h1>
                The fastest growing bank in Nigeria.
            </div>
            <Login />
            
        </div>
    )
}

export default Home;