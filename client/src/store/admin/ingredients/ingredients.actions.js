import api from 'auth-middleware';
import { ADMIN_FETCH_INGREDIENTS, ADMIN_ADD_INGREDIENT } from 'store/action-types';
import { ADMIN_ADD_INGREDIENT_SYNC_SELECTION} from 'store/action-types'

export const fetchIngredients = () => {
    return () => {
        const request = { type: ADMIN_FETCH_INGREDIENTS }
        api('GET', '/api/admin/ingredients/GetFullIngredientsList', request)
    }
}

export const addNewIngredient = (ingredient) => {
    return () => {
        const request = { type: ADMIN_ADD_INGREDIENT, payload: ingredient }
        let data = api('POST', '/api/admin/ingredients/AddIngredient', request)
        console.log(data)
        // dispatch(fetchIngredients())
    }
}