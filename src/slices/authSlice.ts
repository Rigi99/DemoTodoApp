import {createSlice, createAsyncThunk, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import {ApiResponse, User} from "../types/user.ts";
import axios from "axios";

type UserType = {
    email: string;
    password: string;
};

type NewUser = UserType & {
    username: string;
};

type UserProfileData = {
    username: string;
    email: string;
};

type AuthApiState = {
    basicUserInfo?: User | null;
    userProfileData?: UserProfileData | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
};

const initialState: AuthApiState = {
    basicUserInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") as string).user
        : null,
    userProfileData: undefined,
    status: "idle",
    error: null,
};

type LoginThunk = ReturnType<typeof createAsyncThunk<ApiResponse, UserType>>;
type RegisterThunk = ReturnType<typeof createAsyncThunk<ApiResponse, NewUser>>;
type LogoutThunk = ReturnType<typeof createAsyncThunk<ApiResponse, string>>;
type GetUserThunk = ReturnType<typeof createAsyncThunk<ApiResponse, string>>;

export const login: LoginThunk = createAsyncThunk("login", async (data: UserType) => {
    const response = await axiosInstance.post("/auth/login", data);
    const resData = response.data;
    localStorage.setItem("userInfo", JSON.stringify(resData));
    return resData;
});

export const register: RegisterThunk = createAsyncThunk("register", async (data: NewUser) => {
    const response = await axiosInstance.post("/auth/register", data);
    const resData = response.data;
    localStorage.setItem("userInfo", JSON.stringify(resData));
    return resData;
});

export const logout: LogoutThunk = createAsyncThunk("logout", async (id: string) => {
    const response = await axiosInstance.post(`/auth/logout/${id}`, {});
    const resData = response.data;
    localStorage.removeItem("userInfo");
    return resData;
});

export const getUser: GetUserThunk = createAsyncThunk("users/profile", async (userId: string, {dispatch}) => {
    try{
        const response = await axiosInstance.get(`/users/${userId}`);
        console.log("authSlice",response);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                dispatch(logout(userId));
            } else {
                console.error(error);
                throw error;
            }
        } else {
            console.error('Unexpected error', error);
            throw error;
        }
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.status = "idle";
                state.basicUserInfo = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = (action.error as SerializedError).message || "Login failed";
            })
            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.status = "idle";
                state.basicUserInfo = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = (action.error as SerializedError).message || "Register failed";
            })
            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "idle";
                state.basicUserInfo = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.error = (action.error as SerializedError).message || "Logout failed";
            })
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.status = "idle";
                state.userProfileData = action.payload.user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = (action.error as SerializedError).message || "Get user failed";
            });
    },
});

export default authSlice.reducer;
