import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const handleFetchContactsFulfilled = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items = action.payload;
};

const handleAddContactsFulfilled = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items.push(action.payload);
};

const handleDeleteContactsFulfilled = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  const index = state.contacts.items.findIndex(
    task => task.id === action.payload
  );
  state.contacts.items.splice(index, 1);
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFetchContactsFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleAddContactsFulfilled)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleDeleteContactsFulfilled)
      .addCase(deleteContact.rejected, handleRejected),
});

export const contactsReducer = contactsSlice.reducer;
