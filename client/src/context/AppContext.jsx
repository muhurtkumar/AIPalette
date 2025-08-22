import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [showLogin, setShowLogin] = useState(false);

    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);

    const [generatedPalettes, setGeneratedPalettes] = useState([]);
    const [generatedPrompt, setGeneratedPrompt] = useState("");

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
    const savePalette = async ({ paletteId, colors }) => {
        if (!userToken) {
            toast.error("You must be logged in to save palettes");
            return;
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/palettes/save', {
                paletteId: paletteId || undefined,
                colors: colors || undefined,
            }, {
                headers: { token: userToken }
            });
            if (data.success) {
                setUserData((prev) => ({
                ...prev,
                savedPalettes: data.user.savedPalettes,
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

    // Function to save color
    const saveColor = async (color) => {
        if (!userToken) {
            toast.error("You must be logged in to save colors");
            return;
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/palettes/color/save', {
                color
            }, {
                headers: { token: userToken }
            });

            if (data.success) {
                setUserData((prev) => ({
                    ...prev,
                    savedColors: data.savedColors,
                }));
                toast.success(data.message);
            } else {
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

    // Function to like/unlike a palette
    const toggleLike = async (paletteId) => {
        if (!userToken) {
            toast.error("You must be logged in to like palettes");
            return;
        }

        try {
            const { data } = await axios.post(
                backendUrl + `/api/palettes/palette/like/${paletteId}`,
                {},
                { headers: { token: userToken } }
            );

            if (data.success) {
                await fetchUserData();
                toast.success(data.message);
                return { success: true, likes: data.likes };
            } 
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
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
        getPaletteById,
        saveColor,
        generatedPalettes,
        setGeneratedPalettes,
        generatedPrompt,
        setGeneratedPrompt,
        toggleLike
    }

    return (
        (<AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>)
    )
}