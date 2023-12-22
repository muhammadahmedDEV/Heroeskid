import { combineReducers, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { reducer as formReducer, FormStateMap } from 'redux-form'
import app, { AppState } from './app'
import userList, { UsersState } from './userList'
import orgList, { OrgsState } from './orgList'
import currentUser, { CurrentUserState } from './currentUser'
export interface State {
  router: RouterState,
  form: FormStateMap,
  app: AppState
  userList: UsersState
  orgList: OrgsState
  currentUser: CurrentUserState
}

export function createReducers (history: History): Reducer<State> {
  return combineReducers<State>({
    router: connectRouter(history),
    form: formReducer,
    app,
    userList,
    orgList,
    currentUser
  })
}
