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

    // Function to save palette
    const savePalette = async (paletteId) => {
        if (!userToken) {
            toast.error("You must be logged in to save palettes");
            return;
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/palettes/save', {
                paletteId
            }, {
                headers: { token: userToken }
            });
            if (data.success) {
                setUserData((prev) => ({
                ...prev,
                savedPalettes: data.savedPalettes,
                }));
                toast.success(data.message);
            } 
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Function to get a palette by ID
    const getPaletteById = async (id) => {
        try {
            const { data } = await axios.get(backendUrl + `/api/palettes/palette/${id}`);
            if (data.success) {
                return data.palette; 
            } 
            else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return null;
        }
    };
    
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
        fetchUserData, 
        savePalette,
        getPaletteById
    }

    return (
        (<AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>)
    )
}