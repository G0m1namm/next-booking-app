import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsState {
  items: BreadcrumbItem[];
}

const initialState: BreadcrumbsState = {
  items: [],
};

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumbs: (
      state: BreadcrumbsState,
      action: PayloadAction<BreadcrumbItem[]>
    ) => {
      state.items = action.payload;
    },
    resetBreadcrumbs: (state) => {
      state.items = [];
    },
  },
});

export const { setBreadcrumbs, resetBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;
