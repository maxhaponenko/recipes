import { combineReducers } from 'redux'

import ingredientsReducer from './ingredients.reducer';
import addIngredientModalReducer from './add-ingredient-modal.reducer';

export default combineReducers({
    ingredients: ingredientsReducer,
    addIngredientFlow: addIngredientModalReducer
})