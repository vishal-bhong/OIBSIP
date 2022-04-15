import * as api from '../api/index.js';
import { toast } from 'react-toastify';

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(formData);

        dispatch({ type: 'AUTH', data });

        //navigate('/');
    } catch (err) {
        console.log(err);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: "AUTH", data });
        toast.success(`${data.message}`)
       // navigate('/');
    } catch (err) {
        toast.error(`${err.response.data.message}`)
        console.log(err);
    }
}

// export const otpGenerator = (formData) => async (dispatch) => {
//     try {
//         const { data } = await api.otpgenerator(formData);

//         dispatch({ type: "OTP_GENERATOR", data });
        
//     } catch (error) {
//         console.log(error);
//     }
// }

