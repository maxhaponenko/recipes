import api from 'auth-middleware';
import { ADMIN_FETCH_INGREDIENTS } from 'store/action-types';

export const fetchIngredients = () => {
    return () => {
        const request = {type: ADMIN_FETCH_INGREDIENTS}
        api('GET', '/api/admin/ingredients/GetFullIngredientsList', request)
    }
}