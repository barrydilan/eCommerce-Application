import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productApi } from '../../entities/product';
import { authApi, signUpApi, userReducer } from '../../entities/user';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
	[signUpApi.reducerPath]: signUpApi.reducer,
	userReducer,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware()
				.concat(productApi.middleware)
				.concat(authApi.middleware)
				.concat(signUpApi.middleware);
		},
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
