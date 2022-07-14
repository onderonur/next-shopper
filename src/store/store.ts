import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '@src/cart/cartSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({ cart: cartReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () =>
  configureStore<RootState>({
    reducer: (state, action) => {
      if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
      }

      return rootReducer(state, action);
    },
  });

type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore['dispatch'];

// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const wrapper = createWrapper<AppStore>(makeStore);
