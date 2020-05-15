import api from 'auth-middleware';
import { 
    ADMIN_FETCH_INGREDIENTS, 
    SAVE_SELECTION,
    DISPOSE_SELECTION,
    ADMIN_ADD_INGREDIENT
} from 'store/action-types';


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