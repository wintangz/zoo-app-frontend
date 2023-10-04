// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import authService from './authService';
// import { toastError } from '../../components/Toastify';

// const initialState = {
//   user: {},
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: '',
// };

// export const login = createAsyncThunk(
//   'auth/login',
//   async (dataForm, thunkAPI) => {
//     try {
//       return await authService.login(dataForm);
//     } catch (error) {
//       toastError('Sai tài khoản hoặc mật khẩu');
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     return await authService.logout();
//   } catch (error) {
//     toastError('Đăng xuất thất bại');
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = 'fail';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.message = 'success';
//         state.user = action.payload?.data;
//       })
//       .addCase(logout.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(logout.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = 'fail';
//       })
//       .addCase(logout.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = false;
//         state.user = null;
//         state.message = 'logout thành công';
//       });
//   },
// });

// const authReducer = authSlice.reducer;

// export default authReducer;
