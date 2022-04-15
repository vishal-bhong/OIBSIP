const authReducer = (state = { authData: null, otpData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('userProfile', JSON.stringify({ ...action?.data }));
            console.log(action.data);
            return { ...state, authData: action?.data };

        default:
            return state;
    }
};

export default authReducer;