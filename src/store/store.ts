import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/cart/cartSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: combineReducers({ cart: cartReducer }),
});

// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
