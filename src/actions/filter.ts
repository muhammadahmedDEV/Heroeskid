
import { createRoutine } from 'redux-saga-routines'

// Types
import { FilterPayload } from '../models/commonTypes'

// FILTER ACTIONS
export const addFilterList = createRoutine('ADD_FILTER', (payload: FilterPayload) => payload)
export const setFilter = createRoutine('SET_FILTER', (payload: FilterPayload[]) => payload)
