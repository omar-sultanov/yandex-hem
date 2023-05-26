import { Unit } from '@/types/Unit';
import { IUser } from '@/types/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/yandex/' }),
  endpoints: (build) => ({
    getAllUnits: build.query<Unit[], void>({
      query: () => 'units',
    }),
    getInfoUser: build.query<any, void>({
      query: () => 'data'
    }),
    getOneDevice: build.query<Unit, string>({
      query: (id) => `devices/${id}`,
    }),
    controlDevice: build.mutation({
      query: (body) => ({
        url: 'control',
        method: 'POST',
        body,
      }),
    }),
    controlScenari:build.mutation({
      query:(id) => ({
        url: `scenarios/${id}/actions`,
        method: 'POST',
      }),
    })
  }),
});
export const {useLazyGetInfoUserQuery, useLazyGetAllUnitsQuery,useGetInfoUserQuery, useControlDeviceMutation, useLazyGetOneDeviceQuery, useGetOneDeviceQuery, useControlScenariMutation } = deviceApi;
