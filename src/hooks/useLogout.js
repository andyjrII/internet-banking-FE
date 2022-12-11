import axios from "../api/axios";

const useLogout = () => {

    const logout = async () => {
        try {
            const response = await axios.get('/auth/signout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
        localStorage.removeItem('authTokens')
    }

    return logout;
}

export default useLogout