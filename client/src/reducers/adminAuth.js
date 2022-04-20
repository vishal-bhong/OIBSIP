const adminAuthReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'ADMIN_AUTH':
            localStorage.setItem('adminProfile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        default:
            return state;
    }
};

export default adminAuthReducer;