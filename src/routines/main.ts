// MAIN MODULES
import { Action } from "redux-actions";
import { takeEvery, put, select, call } from "redux-saga/effects";
import { createRoutine } from "redux-saga-routines";
import { push } from "connected-react-router";

// ACTIONS
import {
  addFilterList,
  setFilter,
  deleteCurrent,
  createUser,
  logIn,
  isUserAuth,
  redirectTo,
  getUserFromId,
  openFilterBar,
  addUserList,
  addOrgList,
  addCityList,
  addDisorderList,
  addCurrentUser,
  addLanguages,
  createLoginUser,
  createLogoutUser,
  socialSignUp,
  setTermsAccepted,
  addDiagnoses,
  setScrollPosition,
  setCarouselPosition,
  getOrgFromId,
  setProfileType,
  setSignedUpNewsLetter
} from "../actions";

// TYPES
import { FilterPayload } from "../models/commonTypes";
// SERVICES
import {
  signInWithEmailAndPassword,
  getUserData,
  googleAuth,
  facebookAuth,
  createCheckoutSession,
  isStripePayment,
} from "../servises/firebase";

// REDUCER
export const deleteFilterById = createRoutine(
  "DELETE_FILTER_BY_ID",
  (payload: FilterPayload[]) => payload
);
export const deleteAll = createRoutine("DELETE_ALL_FILTER");
export const setUser = createRoutine("SET_USER", (payload: object) => payload);
export const setUsers = createRoutine(
  "SET_USERS",
  (payload: object) => payload
);
export const setDiagnoses = createRoutine(
  "SET_DIAGNOSES",
  (payload: object) => payload
);
export const setLoginUser = createRoutine(
  "SET_LOGIN_USER",
  (payload: object) => payload
);
export const toogleTermsAccepted = createRoutine(
  "TOOGLE_TERMS_ACCEPTED",
  (payload: boolean) => payload
);

export const toogleSignedUpNewsLetter = createRoutine(
  "TOOGLE_SIGNED_UP_NEWSLETTER",
  (payload: boolean) => payload
);

export const setLogoutUser = createRoutine("SET_LOGOUT_USER");
export const toggleFilterView = createRoutine(
  "TOGGLE_FILTER_VIEW",
  (payload: boolean) => payload
);
export const userPageView = createRoutine(
  "TOGGLE_USER_PAGE_VIEW",
  (payload: boolean) => payload
);
export const getError = createRoutine("GET_ERROR", (payload: any) => payload);
export const clearError = createRoutine(
  "CLEAR_ERROR",
  (payload: any) => payload
);
export const filterBar = createRoutine(
  "FILTER_BAR",
  (payload: boolean) => payload
);
export const addUserListToStore = createRoutine(
  "ADD_USER_LIST_TO_STORE",
  (payload: boolean) => payload
);
export const addOrgListToStore = createRoutine(
  "ADD_ORG_LIST_TO_STORE",
  (payload: boolean) => payload
);
export const updateScrollPosition = createRoutine(
  "UPDATE_SCROLL_POSITION",
  (payload: any) => payload
);
export const updateCarouselPosition = createRoutine(
  "UPDATE_CAROUSEL_POSITION",
  (payload: any) => payload
);
export const updateProfileType = createRoutine(
  "UPDATE_PROFILE_TYPE",
  (payload: any) => payload
);
export interface FormValues {
  value: string;
}
type _t_userCreate = {
  additionalUserInfo: object;
  credential: null | object;
  operationType: string;
  user: any;
  flag?: string;
};
type _t_userLogin = {
  user: any;
};
type _t_login = {
  email: string;
  password: string;
  flag?: string;
};

export type Payload = Action<FilterPayload>;
function* handlerFilterList({ payload }: Action<FilterPayload>) {
  try {
    const state = yield select();
    // const newVal: FilterPayload[] = [...state.app.filterList, payload];
    const isNew = state.app.filterList.some((item: FilterPayload) => {
      return item.option === payload.option && item.group !== payload.group;
    });
    const isAdd = state.app.filterList.some((item: FilterPayload) => {
      return item.option === payload.option && item.group === payload.group;
    });

    if (isAdd) {
      const list: FilterPayload[] = state.app.filterList;
      const newState: FilterPayload[] = list.filter((item: FilterPayload) => {
        // return item.option === payload.option && item.group === payload.group;
        return item.option !== payload.option;
      });
      yield put(setFilter(newState));
    } else if (isNew) {
      const list: FilterPayload[] = state.app.filterList;
      const newState: FilterPayload[] = [...state.app.filterList, payload];
      // const newState: FilterPayload[] = list.filter((item: FilterPayload) => {
      //   return item.option === payload.option && item.group !== payload.group;
      //   // return item.option !== payload.option;
      // });
      yield put(setFilter(newState));
    } else {
      const newState: FilterPayload[] = [...state.app.filterList, payload];
      yield put(setFilter(newState));
      yield put(toggleFilterView(false));
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteAction({ payload }: Action<string>) {
  try {
    const state = yield select();
    if (payload === "all") {
      yield put(deleteAll());
    } else {
      const list: FilterPayload[] = state.app.filterList;
      const newState: FilterPayload[] = list.filter((item: any) => {
        return item.option !== payload;
      });
      yield put(deleteFilterById(newState));
    }
  } catch (error) {
    console.log(error);
  }
}
function* addUserAction({ payload }: Action<_t_userCreate>) {
  try {
     yield put(setUser(payload.user));
  } catch (error) {
    console.log(error);
  }

  let stripeId: any
  if (payload?.flag === "organizations") {
    const result = yield call(isStripePayment, {
      table: 'org-pro-customer',
      id: payload.user.uid,
    });
    result.forEach((doc: any) => {
      const newDoc: any = doc.data();
      stripeId = newDoc;
    });

    if (stripeId?.status === 'active') {
      yield put(push("/join-our-organizations"));
    } else {
      // redirect to stripe here
      yield put(push("/check-out"));
    }
  } else {
    yield put(push("/join-our-professionals"));
  }
}
function* LoginUserAction({ payload }: Action<_t_userLogin>) {
  try {
    yield put(setLoginUser(payload));
  } catch (error) {
    console.log(error);
  }
}
function* LogoutUserAction() {
  try {
    yield put(setLogoutUser());
  } catch (error) {
    console.log(error);
  }
}
function* handleTermsAccepted({ payload }: any) {
  try {
    yield put(toogleTermsAccepted(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handleSignedUp({ payload }: any) {
  try {
    yield put(toogleSignedUpNewsLetter(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handleScrollPosition({ payload }: any) {
  try {
    yield put(updateScrollPosition(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handleCarouselPosition({ payload }: any) {
  try {
    yield put(updateCarouselPosition(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handleProfileType( {payload}: any) {
  try {
    yield put(updateProfileType(payload));
  } catch (error) {
    console.log(error);
  }
}
function* logInUser({ payload }: Action<_t_login>) {
  try {
    const { email, password, flag } = payload;
    const res: _t_userCreate = yield call(
      signInWithEmailAndPassword,
      email,
      password
    );

    // let user: any;
    let loginUser: any;
    let loginOrg: any
    const querySnapshot = yield call(getUserData, {
      table: 'users',
      id: res.user.uid,
    });
    querySnapshot.forEach((doc: any) => {
      const newDoc: any = doc.data();
      loginUser = newDoc;
    });
    const result = yield call(getUserData, {
      table: 'organizations',
      id: res.user.uid,
    });
    result.forEach((doc: any) => {
      const newDoc: any = doc.data();
      loginOrg = newDoc;
    });

    if (loginUser?.id) {
      yield put(setProfileType('users'));
      yield put(setLoginUser(loginUser));
      yield put(push(`/user/${loginUser.id}`));
    } else if (loginOrg?.id) {
      yield put(setProfileType('organizations'));
      yield put(setLoginUser(loginOrg));
      yield put(push(`/org/${loginOrg.id}`));
    } else {
      yield put(createUser({ ...res, flag })); // redirect to relevant page to create profile
    }
  } catch (error) {
    console.log(error);
    yield put(getError(error));
  }
}

// function* handlerSocialSignUp(type: string, dispatch: any) {
function* handlerSocialSignUp({ payload }: any) {
  try {
    const { type, dispatch, flag } = payload;
    let res: any;
    if (type === "FB") {
      res = yield call(facebookAuth, dispatch, flag);
    } else {
      res = yield call(googleAuth, dispatch, flag);
    }
    let user: any;
    const querySnapshot = yield call(getUserData, {
      table: "users",
      id: res.user.uid,
    });
    querySnapshot.forEach((doc: any) => {
      const newDoc: any = doc.data();
      user = newDoc;
    });
    if (user) {
      yield put(setLoginUser(user));
      yield put(push(`/user/${user.id}`));
    } else {
      yield put(push(`/join-our-professionals`));
    }
  } catch (error) {
    console.log(error);
    yield put(getError(error));
  }
}
function* checkUserAuth({ payload }: any) {
  try {
    yield put(setUser(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handlerRedirectTo({ payload }: Action<string>) {
  try {
    // This caused search redirect issue
    // const state = yield select();
    // yield put(push(`${payload}`));
    // yield put(toggleFilterView(!state.app.filterView));
  } catch (error) {
    console.log(error);
  }
}
function* fetchCurrentUser({ payload }: Action<string>) {
  try {
    yield put(push(`/user/${payload}`));
    // TODO
  } catch (error) {
    console.log(error);
  }
}
function* fetchCurrentOrg({ payload }: Action<string>) {
  try {
    yield put(push(`/org/${payload}`));
    // TODO
  } catch (error) {
    console.log(error);
  }
}

function* switchFilterBar({ payload }: Action<string>) {
  try {
    const state = yield select();
    yield put(filterBar(!state.app.isFilterBarOpen));
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddUsers({ payload }: Action<any>) {
  try {
    yield put(addUserListToStore(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handlerAddOrgs({ payload }: Action<any>) {
  try {
    yield put(addOrgListToStore(payload));
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddCity({ payload }: Action<any>) {
  try {
    yield put(addCityList.success(payload));
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddDisorder({ payload }: Action<any>) {
  try {
    yield put(addDisorderList.success(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handlerAddCurrentUser({ payload }: Action<any>) {
  try {
    const state = yield select();
    if (typeof payload === "string") {
      const a = state.userList.list.filter((val: any) => {
        if (val.id === payload) {
          return true;
        } else {
          return false;
        }
      });
      yield put(addCurrentUser.success(a[0]));
    } else {
      yield put(addCurrentUser.success(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handlerAddLanguages({ payload }: Action<any>) {
  try {
    yield put(addLanguages.success(payload));
  } catch (error) {
    console.log(error);
  }
}
function* handlerAddDiagnoses({ payload }: Action<any>) {
  try {
    yield put(addDiagnoses.success(payload));
  } catch (error) {
    yield put(setDiagnoses([]));
    console.log(error);
  }
}
export function* saga() {
  yield takeEvery(addFilterList.TRIGGER, handlerFilterList);
  yield takeEvery(deleteCurrent.TRIGGER, deleteAction);
  yield takeEvery(createUser.TRIGGER, addUserAction);
  yield takeEvery(createLoginUser.TRIGGER, LoginUserAction);
  yield takeEvery(createLogoutUser.TRIGGER, LogoutUserAction);
  yield takeEvery(logIn.TRIGGER, logInUser);
  yield takeEvery(isUserAuth.TRIGGER, checkUserAuth);
  yield takeEvery(redirectTo.TRIGGER, handlerRedirectTo);
  yield takeEvery(getUserFromId.TRIGGER, fetchCurrentUser);
  yield takeEvery(getOrgFromId.TRIGGER, fetchCurrentOrg);
  yield takeEvery(openFilterBar.TRIGGER, switchFilterBar);
  yield takeEvery(addUserList.TRIGGER, handlerAddUsers);
  yield takeEvery(addOrgList.TRIGGER, handlerAddOrgs);
  yield takeEvery(addCityList.TRIGGER, handlerAddCity);
  yield takeEvery(addDisorderList.TRIGGER, handlerAddDisorder);
  yield takeEvery(addCurrentUser.TRIGGER, handlerAddCurrentUser);
  yield takeEvery(addLanguages.TRIGGER, handlerAddLanguages);
  yield takeEvery(addDiagnoses.TRIGGER, handlerAddDiagnoses);
  yield takeEvery(socialSignUp.TRIGGER, handlerSocialSignUp);
  yield takeEvery(setTermsAccepted.TRIGGER, handleTermsAccepted);
  yield takeEvery(setSignedUpNewsLetter.TRIGGER, handleSignedUp);
  yield takeEvery(setScrollPosition.TRIGGER, handleScrollPosition);
  yield takeEvery(setCarouselPosition.TRIGGER, handleCarouselPosition);
  yield takeEvery(setProfileType.TRIGGER, handleProfileType);
}
