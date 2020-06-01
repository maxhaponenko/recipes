import api from 'auth-middleware';
import { 
    ADMIN_FETCH_INGREDIENTS, 
    SAVE_SELECTION,
    DISPOSE_SELECTION,
    ADMIN_ADD_INGREDIENT
} from 'store/action-types';
import { ADMIN_CONFIRM_ACTION_MODAL } from 'constants/modals'
import { openModal, closeModal } from 'store/shared/modal/modals.actions'


export const fetchIngredients = () => {
    return () => {
        const request = { type: ADMIN_FETCH_INGREDIENTS }
        api('GET', '/api/admin/ingredients/GetFullIngredientsList', request)
    }
}

export const onSelectionChange = (selection) => ({
    type: SAVE_SELECTION, payload: selection
})

export const disposeSelection = () => ({
    type: DISPOSE_SELECTION
})

export const addNewIngredient = (ingredient) => {
    return async (dispatch) => {
        const request = { type: ADMIN_ADD_INGREDIENT, payload: ingredient }
        await api('POST', '/api/admin/ingredients/AddIngredient', request)
        dispatch(fetchIngredients())
        dispatch(disposeSelection())
    }
}

export const processIngredientDelete = (ingredient) => {
    return async (dispatch) => {
        dispatch(openModal({
            id: ADMIN_CONFIRM_ACTION_MODAL,
            payload: {
                
            }
        }))
    }
}

export const closeIngredientsDeleteModal = () => {
    return dispatch => {
        dispatch(closeModal({id: ADMIN_CONFIRM_ACTION_MODAL}))
    }
}
