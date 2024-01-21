//user id

const initialUserState = {
    userId: '',
    name: '',
    pronouns: '',
}

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
        return action.payload;
        default:
        return state;
    }
};

export default userReducer;