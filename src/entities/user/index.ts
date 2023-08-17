import getFullName from './lib/helpers/getFullName.ts';

export { signUpApi, useSignUpMutation, useLoginUserDataMutation } from './api/signUpApi.ts';
export { COOKIE_ACCESS_TOKEN_NAME, USER_LOGGED_IN_DATA_KEY } from './consts/constants.ts';
export { authApi, useAnonymousSessionMutation, useGetLoginTokenMutation } from './api/authApi.ts';
export { userReducer, userSlice } from './model/slice.ts';
export { getFullName };
