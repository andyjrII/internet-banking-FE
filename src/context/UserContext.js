import { createContext, useState } from "react";
import axios from '../api/axios';

const USER_URL = '/auth/user';
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [ name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountId, setAccountId] = useState('');

    const getUser = async () => {
        try {
            const response = await axios.get(USER_URL, {
                withCredentials: true
            });
            const user = response.data;
            const account = response.data.account;

            setName(user.firstName + " " + user.lastName);
            setAccountNumber(account.accountNumber);
            setAccountBalance(account.accountBalance);
            setAccountType(account.accountType);
            setAccountId(account.id);
        } catch (err) {
            console.error(err);
        }
    }

    getUser();

    return (
        <UserContext.Provider value={{ 
            accountNumber: [accountNumber, setAccountNumber], 
            balance: [accountBalance, setAccountBalance],
            name: [name, setName],
            accountType: [accountType, setAccountType],
            accountId: [accountId, setAccountId]
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;