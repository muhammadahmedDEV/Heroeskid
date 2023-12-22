import { Action } from 'redux'
import { addCurrentUser } from '../actions/index'
// TYPES
import { FilterPayload } from '../models/commonTypes'

export interface CurrentUserState {
  currentUser: any
}

const initialState: CurrentUserState = {
  currentUser: null
}
interface ActionCommon extends Action {
  payload: FilterPayload[] & boolean
}

export default function app (state: CurrentUserState = initialState, { type, payload }: ActionCommon): CurrentUserState {
  switch (type) {
    case addCurrentUser.SUCCESS:
      return { ...state, currentUser: payload }
    default:
      return state
  }
}
