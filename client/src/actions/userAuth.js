import * as api from '../api/index.js';
import { toast } from 'react-toastify';

export const userLogin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.UserLogin(formData);

        dispatch({ type: 'USER_AUTH', data });

        navigate('/user/dashboard');
    } catch (err) {
        console.log(err);
    }
};

export const userSignup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.UserSignup(formData);

        dispatch({ type: "USER_AUTH", data });
        toast.success(`${data.message}`)
        navigate('/user/dashboard');
    } catch (err) {
        toast.error(`${err.response.data.message}`)
        console.log(err);
    }
}


