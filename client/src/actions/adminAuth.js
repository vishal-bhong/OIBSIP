import * as api from '../api/index.js';
import { toast } from 'react-toastify';

export const adminLogin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.AdminLogin(formData);

        dispatch({ type: 'ADMIN_AUTH', data });

        navigate('/admin/dashboard');
    } catch (err) {
        console.log(err);
    }
};

export const adminSignup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.AdminSignup(formData);

        dispatch({ type: "ADMIN_AUTH", data });
        toast.success(`${data.message}`)
        navigate('/admin/dashboard');
    } catch (err) {
        toast.error(`${err.response.data.message}`)
        console.log(err);
    }
}