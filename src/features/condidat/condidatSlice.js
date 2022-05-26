import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import condidatService from "./condidatService";

const initialState = {
    condidats: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new condidat
export const updateCondidat = createAsyncThunk(
    "condidats/update",
    async(Data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.updateCondidat(Data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get condidat by id
export const getCondidatById = createAsyncThunk(
    "condidats/getbyid",
    async(Data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.getCondidatById(Data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createCv = createAsyncThunk(
    "condidats/getbyid",
    async(Data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.createCv(Data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const condidatSlice = createSlice({
    name: "condidats",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCondidat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCondidat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.condidats = action.payload;
            })
            .addCase(updateCondidat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCondidatById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCondidatById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.condidats = action.payload;
            })
            .addCase(getCondidatById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    },
});

export const { reset } = condidatSlice.actions;
export default condidatSlice.reducer;