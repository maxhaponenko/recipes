import { ADMIN_FETCH_INGREDIENTS } from 'store/action-types'

const initialState = {
    items: [],
    types: [],
    units: []
}

const ingredientsReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case ADMIN_FETCH_INGREDIENTS.SUCCESS: {
            return {
                ...state,
                ...action.payload.data
            }
        }
        default:
            return state
    }
} 

export default ingredientsReducer