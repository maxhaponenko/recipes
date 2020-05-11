import { AUTH_RESPONSE, LOG_OUT, SAVE_TOKENS } from 'store/action-types';

const initialState = {
    userId: '',
    isAuthenticated: false,
    firstName: '',
    lastName: '',
    email: '',
    tokens: {
        accessToken: '',
        refreshToken: ''
    },
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_RESPONSE: {
            return {
                ...state, 
                userId: action.payload.userId,
                userType: action.payload.userType,
                isAuthenticated: action.payload.isAuthenticated,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
            }
        }
        case SAVE_TOKENS: {
            return {
                ...state, 
                tokens: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken
                }
            }
        }
        case LOG_OUT: {
            return initialState
        }
        default: 
            return state
    }
}