
import { baseURL } from '../../config'
import showToast from 'services/toaster'

export const AUTH_RESPONSE = 'AUTH_RESPONSE';
export const LOG_OUT = 'LOG_OUT'

export const SAVE_TOKENS = 'SAVE_TOKENS'


const authResponse = (data) => ({
    type: AUTH_RESPONSE,
    payload: data
})

export const saveTokens = ({accessToken, refreshToken}) => ({
    type: SAVE_TOKENS, 
    payload: {
        accessToken, 
        refreshToken
    }
})

export const logOut = () => ({ type: LOG_OUT })

export const processLogin = (email, password) => {
    return async (dispatch) => {
        const request = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password 
            })
        }
        const response = await fetch(baseURL + '/api/auth/login', request)
        response.json().then((data) => {
            dispatch(authResponse(data))
            dispatch(saveTokens(data))
            showToast(data)
        }) 
    }
}

export const processSignUp = (firstName, lastName, email, password) => {
    return async (dispatch) => {
        const request = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                firstName: firstName,
                lastName: lastName,
                email: email, 
                password: password 
            })
        }
        const response = await fetch(baseURL + '/api/auth/signup', request)
        response.json().then((data) => {
            dispatch(authResponse(data))
            dispatch(saveTokens(data))
            showToast(data)
        })
    }
}

export const processLogOut = () => {
    return async (dispatch, getState) => {
        const request = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                userId: getState().auth.userId
            })
        }
        let response = await fetch(baseURL + '/api/auth/logout', request)
        response = await response.json()
        
        if (response.isAuthenticated === false) {
            dispatch(logOut())
            showToast(response)
        } else {
            dispatch(logOut())
        }
    }
}



export const getNewTokens = async (dispatch, getState) => {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: getState().auth.userId,
            refreshToken: getState().auth.tokens.refreshToken
        })
    }
    const response = await fetch(baseURL + '/api/auth/GetNewTokens', request)
    await response.json().then(data => {
        dispatch(saveTokens(data))
        showToast({toastType: 3, toastMessage: 'Tokens updated'})
        return true
    })
    
}

