import { configureStore } from '@reduxjs/toolkit';
import { deviceApi } from './deviceApi';
import infoSlice from './slices/infoSlice';
export const store = configureStore({
  reducer: {
    [deviceApi.reducerPath]: deviceApi.reducer,
    info:infoSlice
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(deviceApi.middleware),
});
