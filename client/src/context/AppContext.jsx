import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [showLogin, setShowLogin] = useState(false);

    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/users/user', {
                headers: {token: userToken}
            })

            if(data.success){
                setUserData(data.user);
                console.log(data)
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
     useEffect(() => {

        const storedUserToken = localStorage.getItem('userToken'); // keep access of token even after page refresh
        if(storedUserToken) {
            setUserToken(storedUserToken);
        }
    }, [])

    useEffect(() => {
        if(userToken){
            fetchUserData();
        }
    }, [userToken])

    const value = {
        showLogin,
        setShowLogin,
        userToken,
        setUserToken,
        userData,
        setUserData,
        backendUrl,
        fetchUserData
    }

    return (
        (<AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>)
    )
}