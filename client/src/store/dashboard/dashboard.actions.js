import api from 'auth-middleware'
import showToast from 'services/toaster'

export var DASHBOARD_DATA_LOADED = 'DASHBOARD_DATA_LOADED'

const dashboardDataFetchSuccess = (payload) => ({
    type: DASHBOARD_DATA_LOADED,
    payload: payload
})

export const loadDashboardData = (userId) => {
    return async (dispatch) => {
        const data = await api('GET', `/api/dashboard/GetData/${userId}`, null)
        if (data) {
            dispatch(dashboardDataFetchSuccess(data))
            showToast(data)
        }
    }
}