export const createAsyncAction = (type) => ({
    TYPE: `${type}`,
    REQUEST: `${type}--REQUEST`,
    ERROR: `${type}--ERROR`,
    SUCCESS: `${type}--SUCCESS`,
})

// Auth and security
export const AUTH_RESPONSE = 'AUTH_RESPONSE';
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN = 'LOG_IN'
export const SAVE_TOKENS = 'SAVE_TOKENS'

// Admin -> Ingredients page
export const ADMIN_FETCH_INGREDIENTS = createAsyncAction('admin/ingredients/FETCH_INGREDIENTS')

// Admin -> Add ingredient modal
export const SAVE_SELECTION = 'admin/ingredients/SAVE_SELECTION'
export const DISPOSE_SELECTION = 'admin/ingredients/DISPOSE_SELECTION'
export const ADMIN_ADD_INGREDIENT = createAsyncAction('admin/ingredients/ADD_INGREDIENT')