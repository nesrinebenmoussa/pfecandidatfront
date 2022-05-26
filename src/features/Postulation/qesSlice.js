import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qesService from "./qesService";

const initialState = {
    qes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create
export const create = createAsyncThunk("qes/create", async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const res = await qesService.qes(data, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const get = createAsyncThunk("qes/get", async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const res = await qesService.getqes(data, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const QesSlice = createSlice({
    name: "qes",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.qes.push(action.payload);
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(get.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.qes = action.payload;
            })
            .addCase(get.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = QesSlice.actions;
export default QesSlice.reducer;