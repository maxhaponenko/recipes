import { ADMIN_ADD_INGREDIENT, ADMIN_ADD_INGREDIENT_SYNC_SELECTION } from 'store/action-types'

const initialState = {
    selection: {
        name: '',
        type: {},
        unit: {},
        description: ''
    },
    isLoading: false
}

const addIngredientsModalReducer = (state = initialState, action) => {
    
    switch(action.type) {
        
        case ADMIN_ADD_INGREDIENT.REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ADMIN_ADD_INGREDIENT.SUCCESS: {
            return {
                selection: {},
                isLoading: false
            }
        }
        case ADMIN_ADD_INGREDIENT.ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        default:
            return state
    }
} 

export default addIngredientsModalReducer