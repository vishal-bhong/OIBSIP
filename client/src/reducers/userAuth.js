const userAuthReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            localStorage.setItem('userProfile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        default:
            return state;
    }
};

export default userAuthReducer;