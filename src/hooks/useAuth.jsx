import { useEffect } from "react";
import { useGetTokenMutation } from "../services/apiSlice";

const useAuth = () => {
    const [getToken] = useGetTokenMutation();

    useEffect(() => {
        const fetchToken = async () => {
            const response = await getToken().unwrap();
            localStorage.setItem("token", response.token);
        };

        fetchToken();
    }, [getToken]);
};

export default useAuth;
