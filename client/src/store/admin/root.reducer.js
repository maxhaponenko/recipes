import { combineReducers } from 'redux'

import ingredientsReducer from './ingredients/ingredients.reducer';

export default combineReducers({
    ingredients: ingredientsReducer
})