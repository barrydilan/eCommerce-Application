import getFullName from './lib/helpers/getFullName.ts';
import prepareLoginCookieData from './lib/helpers/prepareLoginCookieData.ts';
import useLoginUser from './lib/hooks/useLoginUser.ts';
import UserUpdateActions from './types/enums.ts';

export { signUpApi, useSignUpMutation } from './api/signUpApi.ts';
export { COOKIE_ACCESS_TOKEN, USER_LOGGED_IN_DATA_KEY } from './consts/constants.ts';
export { authApi, useAnonymousSessionMutation, useLoginTokenMutation, useRevokeTokenMutation } from './api/authApi.ts';
export { userReducer, userSlice } from './model/slice.ts';
export {
	userDataApi,
	useLoginUserDataMutation,
	useGetUserQuery,
	useLazyGetUserQuery,
	useDeleteUserDataMutation,
	useUpdateUserDataMutation,
	useUpdateUserAddressMutation,
	useUpdateUserPasswordMutation,
} from './api/userDataApi.ts';
export { getFullName, prepareLoginCookieData, useLoginUser };
export type { IUpdateUserDataParams } from './types/interfaces.ts';
export { UserUpdateActions };
