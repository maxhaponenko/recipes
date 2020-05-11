import { CLOSE_MODAL, OPEN_MODAL } from './modals.reducer'

export const openModal = (payload) => {
	return {
		type: OPEN_MODAL,
		payload,
	}
}
export const closeModal = (payload) => {
	return {
		type: CLOSE_MODAL,
		payload,
	}
}