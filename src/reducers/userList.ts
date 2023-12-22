import { Action } from 'redux'

import { addUserListToStore } from '../routines/main'

// TYPES
import { FilterPayload } from '../models/commonTypes'

export interface UsersState {
  list: any[],
  listLoading: boolean
}

const initialState: UsersState = {
  list: [],
  listLoading: true
}
interface ActionCommon extends Action {
  payload: FilterPayload[] & boolean
}

export default function userList (state: UsersState = initialState, { type, payload }: ActionCommon): UsersState {
  switch (type) {
    case addUserListToStore.TRIGGER:
      return { ...state, list: payload, listLoading : false }
    default:
      return state
  }
}
