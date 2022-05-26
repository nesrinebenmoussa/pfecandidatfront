import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CVservice from "./cvService";

const initialState = {
    cv: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new condidat
export const update = createAsyncThunk("cv/update", async(Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await CVservice.update(Data, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// get condidat by id
export const get = createAsyncThunk("cv/get", async(Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await CVservice.get(Data, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteCV = createAsyncThunk("cv/delete", async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await CVservice.deleteCV(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const create = createAsyncThunk("cv/create", async(Data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await CVservice.create(Data, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const CVslice = createSlice({
    name: "cv",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cv = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCV.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCV.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cv = initialState;
            })
            .addCase(deleteCV.rejected, (state, action) => {
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
                state.cv = action.payload;
            })
            .addCase(get.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(create.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cv = action.payload;
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = CVslice.actions;
export default CVslice.reducer;