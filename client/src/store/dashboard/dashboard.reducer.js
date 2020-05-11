import { DASHBOARD_DATA_LOADED } from './dashboard.actions'

const initialState = {
    data: {}
}

const dashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case DASHBOARD_DATA_LOADED: {
            return {
                ...state,
                data: {
                    ...action.payload.data1,
                    ...action.payload.data2,
                    ...action.payload.data3,
                }
            }
        }
        default: {
            return state
        }
    }
}

export default dashboardReducer