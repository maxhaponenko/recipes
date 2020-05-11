import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from './store/root-reducer';
import { logOut, saveTokens } from 'store/auth/auth.actions';
import showToast from 'services/toaster'
import thunk from 'redux-thunk'

const localStorageAuthKey = 'auth_state'
const saveState = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        window.localStorage.setItem(localStorageAuthKey, serialisedState);
    } catch (err) {
        console.error(err)
    }
};
export const loadState = (key) => {
    try {
        const serialisedState = window.localStorage.getItem(key);
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};

const auth = loadState(localStorageAuthKey)
const oldState = { auth: auth }

let middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    const reduxLogger = createLogger({ collapsed: true, diff: true })
    middleware = [...middleware, reduxLogger]
}

const store = createStore(rootReducer, oldState, composeWithDevTools(applyMiddleware(...middleware)))

store.subscribe(() => {
    saveState(store.getState().auth)
})

// Listen events within localStorage and change tokens
// --> Logout when user made logout on another tab
// --> Re-save tokens which was reseived from /GetNewTokens in other tab
window.addEventListener('storage', event => {
    const storeState = store.getState()
    const lsState = JSON.parse(event.storageArea[localStorageAuthKey])
    if (storeState.auth.isAuthenticated) {
        if (lsState.auth.tokens.accessToken === '' ) {
            store.dispatch(logOut())
            showToast({toastType: 2, toastMessage: 'Logged out.'})
        } else if (lsState.auth.tokens.accessToken !== storeState.auth.tokens.accessToken) {
            store.dispatch(saveTokens({
                accessToken: lsState.auth.tokens.accessToken,
                refreshToken: lsState.auth.tokens.refreshToken
            }))
            showToast({toastType: 3, toastMessage: 'Re-saved tokens from other tab <---------'})
        }
    }
});

export const action = ({type, payload}) => {
    if (!payload) {
        store.dispatch({type})
    } else {
        store.dispatch({ 
            type: type, 
            payload: payload 
        })
    } 
}

export default store