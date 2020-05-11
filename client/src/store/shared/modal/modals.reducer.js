const _ = require('lodash')

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const initialState = []

export default function modalsReducer(state = initialState, action) {
    
	switch (action.type) {
		case OPEN_MODAL:
			return [
				...state,
				action.payload
			];
		case CLOSE_MODAL: {
            const newState = [...state]
            const index = newState.map((item) => item.id).lastIndexOf(action.payload.id)
            _.remove(newState, (v, i) => i === index)
            return newState
        }
		default:
			return state;
	}
};