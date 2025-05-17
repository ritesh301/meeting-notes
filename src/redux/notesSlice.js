import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    current: {
      title: '',
      note: ''
    }
  },
  reducers: {
    setTitle(state, action) {
      state.current.title = action.payload;
    },
    setNote(state, action) {
      state.current.note = action.payload;
    },
    resetCurrent(state) {
      state.current = { title: '', note: '' };
    }
  }
});

export const { setTitle, setNote, resetCurrent } = notesSlice.actions;
export default notesSlice.reducer;
