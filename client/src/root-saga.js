import { fork, all, select, takeEvery } from 'redux-saga/effects'

import { watchLogin } from 'store/auth/auth.actions'
import { watchFetchIngredients } from 'store/admin/ingredients/ingredients.actions'


function* watchAndLog() {
    try {
        yield takeEvery('*', function* logger(action) {
            const state = yield select()
            console.log('action', action)
            console.log('state after', state)
          })
    } catch(e) {
        console.error(e)
    }
}



export default function* rootSaga() {
    yield [
        fork(watchAndLog),
        fork(watchLogin),
        fork(watchFetchIngredients)
    ]
}


