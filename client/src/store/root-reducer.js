import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import dashboardReducer from './dashboard/dashboard.reducer';
import adminReducers from './admin/root.reducer'
import modalsReducer from 'store/shared/modal/modals.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    admin: adminReducers,
    modals: modalsReducer
})

export default rootReducer