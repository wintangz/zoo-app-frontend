// import axios from 'axios';
// import { toastError, toastSuccess } from './../../components/Toastify';

// const url_server = process.env.REACT_APP_SERVER_API;

// const login = async (dataForm) => {
//   const response = await axios.post(
//     'http://localhost:8080/api/auth/login',
//     dataForm
//   );
//   console.log('response.data: ', response.data);
//   if (response?.data.statusCode === 200) {
//     toastSuccess(response.data.message);
//     localStorage.setItem('user', JSON.stringify(response.data.data));
//     localStorage.setItem(
//       'accessToken',
//       JSON.stringify(response.data.data.token)
//     );
//   } else {
//     toastError('Login thất bại');
//   }
//   return response.data;
// };

// const logout = async () => {
//   const response = await axios.get(`${url_server}/authentication/logout`);
//   console.log('🚀 ~ file: authService.js:24 ~ logout ~ response:', response);
//   if (response.data.statusCode === 200) {
//     localStorage.clear();
//     toastSuccess(`Đăng xuất thành công`);
//   }
//   return response.message;
// };

// const authService = {
//   login,
//   logout,
// };

// export default authService;
