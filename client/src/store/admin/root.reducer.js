import { combineReducers } from 'redux'

import ingredientsReducer from './ingredients/root.reducer';

export default combineReducers({
    ingredientsPage: ingredientsReducer
})