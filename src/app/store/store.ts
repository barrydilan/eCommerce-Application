import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productService } from '../../shared/api';

const rootReducer = combineReducers({
	[productService.reducerPath]: productService.reducer,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(productService.middleware);
		},
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
