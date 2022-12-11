import { Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount';
import User from './pages/User';
import Missing from './pages/Missing';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import AirtimeTopup from './pages/AirtimeTopup';
import TransactionHistory from './pages/TransactionHistory';
import Transfer from './pages/Transfer';
import Home from './pages/Home'; 
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import { UserProvider } from './context/UserContext';
import ChangePin from './pages/ChangePin';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          
          {/* we want to protect these routes */}
          <Route element={<RequireAuth />} >
            <Route path="user" element={<User />} />
            <Route path="airtime" element={<AirtimeTopup />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="update-account" element={<ChangePin />} />
          </Route>
                    
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
    </Routes>
  </UserProvider>
  );
}

export default App;
