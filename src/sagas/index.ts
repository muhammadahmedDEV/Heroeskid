import { all, fork } from 'redux-saga/effects'
import { saga as mainAppSaga } from '../routines/main'

export default function * root () {
  return yield all([
    fork(mainAppSaga)
  ])
}
