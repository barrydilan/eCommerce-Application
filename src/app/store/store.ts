import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { readCartApi, updateCartApi } from '../../entities/cart';
import { productApi } from '../../entities/product';
import { authApi, signUpApi, userDataApi, userReducer } from '../../entities/user';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
	[signUpApi.reducerPath]: signUpApi.reducer,
	[userDataApi.reducerPath]: userDataApi.reducer,
	[readCartApi.reducerPath]: readCartApi.reducer,
	[updateCartApi.reducerPath]: updateCartApi.reducer,
	userReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
	configureStore({
		preloadedState,
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware()
				.concat(productApi.middleware)
				.concat(authApi.middleware)
				.concat(signUpApi.middleware)
				.concat(userDataApi.middleware)
				.concat(readCartApi.middleware)
				.concat(updateCartApi.middleware);
		},
	});
