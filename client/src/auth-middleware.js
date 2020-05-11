import { baseURL } from './config'
import jwt from 'jsonwebtoken'
import showToast from 'services/toaster'
import store from 'create-store'
import { getNewTokens, logOut, processLogOut } from 'store/auth/auth.actions'
import { loadState } from 'create-store'

const isExpired = (token = '') => {
    let decodedToken = jwt.decode(token, { complete: true });
    let dateNow = (new Date()).getTime()
    let convertedDateNow = parseInt(dateNow.toString().slice(0,10))
    if (decodedToken.payload.exp <= convertedDateNow) {
        return true
    } else {
        return false
    }
}

// Auth middleware method
const api = async (method = 'GET', url, req, callback) => {

    if (!req.type) {
        console.error('request object should contain type property with action type')
    }
    
    const storeState = store.getState()
    const lsState = loadState()
    const state = {
        ...storeState,
        ...lsState
    }
    
    // Check tokens for expiration
    const accessToken = state.auth.tokens.accessToken
    const refreshToken = state.auth.tokens.refreshToken

    const isExpAccess = isExpired(accessToken)
    const isExprefresh = isExpired(refreshToken)

    if (isExpAccess && !isExprefresh) {
        await getNewTokens(store.dispatch, store.getState)
    } else if (isExpAccess && isExprefresh) {
        store.dispatch(processLogOut())
        return null // when tokens are expired return null value to initial api function call
    }

    // If tokens are ok or store received new tokens, continue...
    try {
        store.dispatch({type: req.type.TYPE})
        let request = {}

        if (method === 'GET') {
            // debugger
            request = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getState().auth.tokens.accessToken}`
                },
            }
        } else {
            // debugger
            // let payload = {}
            // Object.keys(req).forEach(item => {
            //     if (item !== "type" && item !== "success") {
            //         payload[item] = req[item]
            //     }
            // })
            request = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getState().auth.tokens.accessToken}`
                },
                body: JSON.stringify(req.payload)
            }
        }

        
        store.dispatch({type: req.type.REQUEST, request: request})
        const response = await fetch(baseURL + url, request)
        // debugger
        if (response.status === 403) {
            const data = await response.json()
            store.dispatch({
                type: req.type.ERROR,
                payload: data
            })
            store.dispatch(logOut())
            showToast(data)
        } else {
            if (callback && typeof callback === 'function') {
                response.json().then((data) => {
                    store.dispatch({
                        type: req.type.SUCCESS,
                        payload: data
                    })
                    callback(data)
                })
            } else {
                const data = await response.json()
                if (data) {
                    store.dispatch({
                        type: req.type.SUCCESS,
                        payload: data
                    })
                    return data
                } else {
                    store.dispatch({
                        type: req.type.ERROR,
                        payload: data
                    })
                    return null
                }
            }
        }
    } catch (e) {
        console.log('Cusotom error --------->')
        console.error(e)
    }
}

export default api
