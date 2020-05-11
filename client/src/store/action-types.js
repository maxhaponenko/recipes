// CREATS ACTIONS to work with api() wrapper method 
export const createAsyncAction = (type) => ({
    TYPE: `${type}`,
    REQUEST: `${type}--REQUEST`,
    ERROR: `${type}--ERROR`,
    SUCCESS: `${type}--SUCCESS`,
})

// SIMPLE ACTIONS (used without api() wrapper method)
export const AUTH_RESPONSE = 'AUTH_RESPONSE';
export const LOG_OUT = 'LOG_OUT'
export const LOG_IN = 'LOG_IN'
export const SAVE_TOKENS = 'SAVE_TOKENS'


// ACTIONS used with api() method
export const ADMIN_FETCH_INGREDIENTS = createAsyncAction('admin/ingredients/FETCH_INGREDIENTS')

