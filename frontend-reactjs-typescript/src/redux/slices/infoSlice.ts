import { PowerInfo } from '@/types/PowerInfo';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  infoPower: [
    {
      time: new Date(2023, 4, 15, 9, 10).toLocaleString('ru-Ru'),
      power: 31,
    },
    {
      time: new Date(2023, 4, 15, 10, 0).toLocaleString('ru-Ru'),
      power: 31,
    },
    {
      time: new Date(2023, 4, 15, 12, 5).toLocaleString('ru-Ru'),
      power: 1572,
    },
    {
      time: new Date(2023, 4, 15, 12, 24).toLocaleString('ru-Ru'),
      power: 1572,
    },
    {
      time: new Date(2023, 4, 15, 22, 20).toLocaleString('ru-Ru'),
      power: 40,
    },
    {
      time: new Date(2023, 4, 15, 22, 30).toLocaleString('ru-Ru'),
      power: 40,
    },
  ],
  statusAction: true,
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,

  reducers: {
    setInfoPower(state, action) {
      state.infoPower = [...state.infoPower, ...action.payload];
    },
    setActionStatus(state, action) {
      state.statusAction = action.payload;
    },
  },
});

//selectors
export const selectInfoData = (state: any) => state.info;
// Action creators are generated for each case reducer function
export const { setInfoPower, setActionStatus } = infoSlice.actions;
export default infoSlice.reducer;
