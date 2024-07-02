import { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
    const userId = basicUserInfo ? basicUserInfo.user._id : null;

    useEffect(() => {
        if (basicUserInfo) {
            dispatch(getUser(userId));
        }
    }, [basicUserInfo, dispatch, userId, userProfileInfo]);

    const handleLogout = async () => {
        try {
            await dispatch(logout(userId)).unwrap();
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <h1>Home</h1>
            <h4>Username: {userProfileInfo?.username}</h4>
            <h4>Email: {userProfileInfo?.email}</h4>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
                Logout
            </Button>
            <TodoList />
        </>
    );
};

export default Home;
