import { createRoutine } from "redux-saga-routines";

export const deleteCurrent = createRoutine(
  "DELETE_FILTER",
  (payload: string) => payload
);
export const createUser = createRoutine(
  "CREATE_USER",
  (payload: object) => payload
);
export const logIn = createRoutine("LOGIN", (payload: object) => payload);
export const isUserAuth = createRoutine(
  "IS_USER_AUTH",
  (payload: object) => payload
);
export const redirectTo = createRoutine(
  "REDIRECT_TO",
  (payload: string) => payload
);
export const getUserFromId = createRoutine(
  "REDIRECT_TO_USER",
  (payload: string) => payload
);
export const getOrgFromId = createRoutine(
  "REDIRECT_TO_ORG",
  (payload: string) => payload
);
export const openFilterBar = createRoutine(
  "OPEN_FILTER_BAR",
  (payload: string) => payload
);
export const addUserList = createRoutine(
  "ADD_USER_LIST",
  (payload: string) => payload
);
export const addOrgList = createRoutine(
  "ADD_ORG_LIST",
  (payload: string) => payload
);
export const addCityList = createRoutine(
  "ADD_CITY_LIST",
  (payload: string) => payload
);
export const addDisorderList = createRoutine(
  "ADD_DISORDER_LIST",
  (payload: string) => payload
);
export const addCurrentUser = createRoutine(
  "ADD_CURRENT_USER",
  (payload: any) => payload
);
export const addLanguages = createRoutine(
  "ADD_LANGUAGES",
  (payload: string) => payload
);
export const addDiagnoses = createRoutine(
  "ADD_DIAGNOSES",
  (payload: string) => payload
);
export const createLoginUser = createRoutine(
  "CREATE_LOGIN_USER",
  (payload: object) => payload
);
export const createLogoutUser = createRoutine("CREATE_LOGIN_USER");
export const socialSignUp = createRoutine(
  "SOCIAL_SIGNUP",
  (payload: any) => payload
);
export const setTermsAccepted = createRoutine(
  "SET_TERMS_ACCEPTED",
  (payload: any) => payload
);
export const setSignedUpNewsLetter = createRoutine(
  "SET_SIGNED_UP_NEWSLETTER",
  (payload: any) => payload
);
export const setScrollPosition = createRoutine(
  "SET_SCROLL_POSITION",
  (payload: any) => payload
);
export const setCarouselPosition = createRoutine(
  "SET_CAROUSEL_POSITION",
  (payload: any) => payload
);
export const setProfileType = createRoutine(
  "SET_PROFILE_TYPE",
  (payload: any) => payload
);
