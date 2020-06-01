import {
    ADMIN_ADD_INGREDIENT_MODAL,
    ADMIN_CONFIRM_ACTION_MODAL
} from 'constants/modals';

import AddIngredients from 'pages/admin/components/add-ingredient-modal/add-ingredient-modal'
import ConfirmActionModal from 'pages/admin/components/confirm-action-modal/confirm-action-modal'

export default {
    [ADMIN_ADD_INGREDIENT_MODAL]: AddIngredients,
    [ADMIN_CONFIRM_ACTION_MODAL]: ConfirmActionModal
};
