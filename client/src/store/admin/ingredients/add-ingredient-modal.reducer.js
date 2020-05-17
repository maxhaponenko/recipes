import { SAVE_SELECTION, DISPOSE_SELECTION, ADMIN_ADD_INGREDIENT } from 'store/action-types'

const initialState = {
    selection: {
        name: '',
        type: null,
        unit: null,
        description: ''
    },
    isLoading: false
}

const addIngredientsModalReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case SAVE_SELECTION: {
            return {
                ...state,
                selection: {
                    ...state.selection,
                    ...action.payload
                }
            }
        }
        case DISPOSE_SELECTION: {
            return {
                ...state,
                selection: initialState.selection
            }
        }
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