import React, { useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList.tsx";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

    useEffect(() => {
        if (basicUserInfo && basicUserInfo._id) {
            dispatch(getUser(basicUserInfo._id));
        }
    }, [basicUserInfo, dispatch]);

    const handleLogout = async () => {
        try {
            if (basicUserInfo) {
                await dispatch(logout(basicUserInfo._id)).unwrap();
                navigate("/login");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={3}>
            <Box display="flex" justifyContent="space-between" width="100%" mb={3}>
                <Typography variant="h4">Hello, {userProfileInfo?.username}!</Typography>
                <Button variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <Typography variant="h2">Your TODOs</Typography>
            <TodoList userId={basicUserInfo ? basicUserInfo._id : ""} />
        </Box>
    );
};

export default Home;
