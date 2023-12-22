import { Action } from "redux";
import * as Actions from "../actions";
import {
  deleteFilterById,
  deleteAll,
  setUser,
  setUsers,
  toggleFilterView,
  getError,
  clearError,
  filterBar,
  setLoginUser,
  setLogoutUser,
  toogleTermsAccepted,
  updateScrollPosition,
  updateCarouselPosition,
  updateProfileType,
  toogleSignedUpNewsLetter
} from "../routines/main";
import {
  addCityList,
  addDisorderList,
  addLanguages,
  addDiagnoses,
} from "../actions/index";
// TYPES
import { FilterPayload } from "../models/commonTypes";

export interface AppState {
  filterList: FilterPayload[];
  user: object;
  filterView: boolean;
  cityList: any[];
  error: any;
  isFilterBarOpen: boolean;
  userList: any[];
  disorderList: any[];
  languages: any[];
  diagnoses: any[];
  loginUser: any;
  termsAccepted: any;
  signedUpNewsLetter:any;
  scrollPosition: any;
  carouselPosition: any;
  profileType: any;
}
const initialState: AppState = {
  filterList: [],
  user: {},
  filterView: true,
  cityList: [],
  error: {},
  isFilterBarOpen: false,
  userList: [],
  disorderList: [],
  languages: [],
  loginUser: null,
  termsAccepted: true,
  signedUpNewsLetter:true,
  diagnoses: [],
  scrollPosition: 0,
  carouselPosition: 0,
  profileType: ''
};
interface ActionCommon extends Action {
  payload: FilterPayload[] & boolean;
}

export default function app(
  state: AppState = initialState,
  { type, payload }: ActionCommon
): AppState {
  switch (type) {
    case Actions.setFilter.TRIGGER:
      return { ...state, filterList: payload };
    case deleteFilterById.TRIGGER:
      return { ...state, filterList: payload };
    case deleteAll.TRIGGER:
      return { ...state, filterList: [] };
    case setUser.TRIGGER:
      return { ...state, user: payload };
    case setUsers.SUCCESS:
      return { ...state, userList: payload };
    case toggleFilterView.TRIGGER:
      return { ...state, filterView: payload };
    case getError.TRIGGER:
      return { ...state, error: payload };
    case clearError.TRIGGER:
      return { ...state, error: {} };
    case filterBar.TRIGGER:
      return { ...state, isFilterBarOpen: payload };
    case setLoginUser.TRIGGER:
      return { ...state, loginUser: payload };
    case setLogoutUser.TRIGGER:
      return { ...state, loginUser: {} };
    case addCityList.SUCCESS:
      return { ...state, cityList: payload };
    case addDisorderList.SUCCESS:
      return { ...state, disorderList: payload };
    case addDiagnoses.SUCCESS:
      return { ...state, diagnoses: payload };
    case addLanguages.SUCCESS:
      return { ...state, languages: payload };
    case toogleTermsAccepted.TRIGGER:
      return { ...state, termsAccepted: payload };
    case toogleSignedUpNewsLetter.TRIGGER:
      return { ...state, signedUpNewsLetter: payload };
    case updateScrollPosition.TRIGGER:
      return { ...state, scrollPosition: payload };
    case updateCarouselPosition.TRIGGER:
      return { ...state, carouselPosition: payload };
    case updateProfileType.TRIGGER:
      return { ...state, profileType: payload };
      default:
      return state;
  }
}
