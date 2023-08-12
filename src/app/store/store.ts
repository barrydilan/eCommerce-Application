import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productApi } from '../../entities/product';
import { authApi } from '../../entities/user';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(productApi.middleware).concat(authApi.middleware);
		},
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
