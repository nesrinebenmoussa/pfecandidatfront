import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import service from "./PostulationService";

const initialState = {
    postulations: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create
export const create = createAsyncThunk(
    "postulations/create",
    async(data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const res = await service.create(data, token);
            console.log(res, "respons in the serviced");
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
export const getByC = createAsyncThunk(
    "postulations/getByC",
    async(data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await service.getByC(data, token);
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

// Delete
export const remmove = createAsyncThunk(
    "postulations/delete",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await service.deleteById(id, token);
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

export const getById = createAsyncThunk(
    "postulations/getById",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await service.getById(id, token);
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

export const update = createAsyncThunk(
    "postulations/update",
    async(data, thunkAPI) => {
        try {
            return await service.update(data);
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

export const PostulationSlice = createSlice({
    name: "postulations",
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
                state.postulations.push(action.payload);
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getByC.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getByC.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.postulations = action.payload;
            })
            .addCase(getByC.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.postulations = action.payload;
            })
            .addCase(getById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.postulations = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

        .addCase(remmove.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(remmove.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.postulations = state.postulations.filter(
                    (p) => p._id !== action.payload.id
                );
            })
            .addCase(remmove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(state.message);
            });
    },
});

export const { reset } = PostulationSlice.actions;
export default PostulationSlice.reducer;