import axios from 'axios';
import { loginError, loginStart, loginSuccess, logoutError, logoutStart, logoutSuccess, registerError, registerStart, registerSuccess } from '../slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const instance = axios.create({
//     baseURL: 'http://192.168.43.199:8443/api/v1'
// });



// export const loginAccount = () => async (dispatch, data) => {
//     dispatch(loginStart());

//     try {
//         const response = await instance.post('/login', data);
//         dispatch(fetchUsersSuccess(response.data));
//     } catch (error) {
//         dispatch(fetchUsersError(error.message));
//     }
// };x


export const loginUser = async (dispatch, user, navigation) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('http://192.168.43.199:8443/api/v1/authenticate', user);

        dispatch(loginSuccess(response.data));
        let role = response?.data.roleName
        let token = response?.data.token
        let mes = response.data.message


        AsyncStorage.setItem('token', token)
        AsyncStorage.setItem('roleName', role)
        if (mes == "Đăng nhập lỗi") {
            navigation.navigate('Login')
            return
        } else if (role == "OWNER") {
            navigation.navigate('Home')
        } else if (role == "CUSTOMER") {
            navigation.navigate('Client')
        }
    } catch (error) {
        dispatch(loginError(error.message));
    }
};
const api = axios.create({
    baseURL: 'http://192.168.43.199:8443/api/v1',
});

export const logout = async (dispatch, token) => {
    dispatch(logoutStart());
    try {
        const response = await api.get('/logout', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(logoutSuccess(response.data));
    } catch (error) {
        dispatch(logoutError(error.message));
    }
};


export const registerUser = async (dispatch, user, navigation) => {
    dispatch(registerStart());
    try {
        const response = await axios.post('http://192.168.43.199:8443/api/v1/register', user);
        
        dispatch(registerSuccess(response.data));
        navigation.navigate('Login')
    } catch (error) {
        dispatch(registerError(error.message));
    }
};