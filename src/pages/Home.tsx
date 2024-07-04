import React, {useEffect} from "react";
import {Button, Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {getUser, logout} from "../slices/authSlice";
import {useNavigate} from "react-router-dom";
import TodoList from "../components/TodoList.tsx";
import styled from "styled-components";

const StyledButton = styled(Button)`
    && {
        background-color: #f50057;
        color: white;
        border-radius: 4px;
        box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
        transition: background-color 0.3s ease;
        font-size: 15px;

        &:hover {
            background-color: #c51162;
        }
    }
`;

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
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" m={3}>
            <Box display="flex" justifyContent="space-between" width="100%" margin={2}>
                <h1 style={{margin: 0}}>Hello, {userProfileInfo?.username}!</h1>
                <StyledButton onClick={handleLogout}>
                    Logout
                </StyledButton>
            </Box>
            <h1 style={{fontSize: 70, margin: 10}}>Your TODOs</h1>
            <TodoList userId={basicUserInfo ? basicUserInfo._id : ""}/>
        </Box>
    );
};

export default Home;
