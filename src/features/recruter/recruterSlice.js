import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recruterService from './recruterService'

const initialState = {
    recruters: [],
    recruterIsError: false,
    recruterIsSuccess: false,
    recrruterIsLoading: false,
    recruterMessage: '',
}

// Create new recruter
export const createRecruter = createAsyncThunk(
    'recruters/create',
    async(recruterData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await recruterService.create(recruterData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all
export const getRecruters = createAsyncThunk(
    'recruters/getAll',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await recruterService.getAll(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getRecruter = createAsyncThunk(
    'recruters/getRecruter',
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await recruterService.getRecruter(id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const  changeStatus = createAsyncThunk(
    'recruters/changeStatus', 
    async(id, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await recruterService.changeStatus(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete  
export const deleteRecruter = createAsyncThunk(
    'recruters/delete',
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await recruterService.deleteById(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const recruterSlice = createSlice({
    name: 'recruters',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecruter.pending, (state) => {
                state.recrruterIsLoading = true
            })
            .addCase(createRecruter.fulfilled, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsSuccess = true
                state.recruters.push(action.payload)
            })
            .addCase(createRecruter.rejected, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsError = true
                state.recruterMessage = action.payload
            })
            .addCase(getRecruters.pending, (state) => {
                state.recrruterIsLoading = true
            })
            .addCase(getRecruters.fulfilled, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsSuccess = true
                state.recruters = action.payload
            })
            .addCase(getRecruters.rejected, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsError = true
                state.recruterMessage = action.payload
            })
            .addCase(deleteRecruter.pending, (state) => {
                state.recrruterIsLoading = true
            })
            .addCase(deleteRecruter.fulfilled, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsSuccess = true
                state.recruters = state.recruters.filter(
                    (recruter) => recruter._id !== action.payload.id
                )
            })
            .addCase(deleteRecruter.rejected, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsError = true
                state.recruterMessage = action.payload
            })
            .addCase(changeStatus.pending, (state) => {
                state.recrruterIsLoading = true
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsSuccess = true
                state.recruterMessage = action.payload
            })
            .addCase(changeStatus.rejected, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsError = true
                state.recruterMessage = action.payload

            })
            .addCase(getRecruter.pending, (state) => {
                state.recrruterIsLoading = true
            })
            .addCase(getRecruter.fulfilled, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsSuccess = true
                state.recruters = action.payload
                console.log(state.recruters)
            })
            .addCase(getRecruter.rejected, (state, action) => {
                state.recrruterIsLoading = false
                state.recruterIsError = true
                state.recruterMessage = action.payload
            })
    },
})

export const { reset } = recruterSlice.actions
export default recruterSlice.reducer