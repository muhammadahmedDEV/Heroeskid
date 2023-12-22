import { Action } from 'redux'

import { addOrgListToStore } from '../routines/main'

// TYPES
import { FilterPayload } from '../models/commonTypes'

export interface OrgsState {
  orgList: any[],
  orgListLoading: boolean
}

const initialState: OrgsState = {
  orgList: [],
  orgListLoading: true
}
interface ActionCommon extends Action {
  payload: FilterPayload[] & boolean
}

export default function orgList (state: OrgsState = initialState, { type, payload }: ActionCommon): OrgsState {
  switch (type) {
    case addOrgListToStore.TRIGGER:
      return { ...state, orgList: payload, orgListLoading: false }
    default:
      return state
  }
}
