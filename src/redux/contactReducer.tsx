
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  name: string;
  email: string;
  phone: string;
  website: string;
  
}

interface MyState {
  contactList: Contact[];
  loading:boolean;
  error:any
}

const initialState: MyState = {
  contactList: [],
  loading:false,
  error:null
};

const contactsSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    fetchContactStart:(state)=>{
        state.loading = true;
        state.error=null;
    },
    fetchContactSuccess:(state, action)=>{
        state.loading=false;
        state.contactList = action.payload;
    },
    fetchContactFailure:(state, action)=>{
        state.loading = false;
        state.error=action.payload;
    },
    //add contact reducer
    add: (state, action: PayloadAction<Contact>) => {
      state.contactList.push(action.payload);
    },
    //delete contact reducer
    delete: (state, action: PayloadAction<number>) => {
      state.contactList.splice(action.payload, 1);
    },
    //reset the data
    reset: (state) => {
      state.contactList.splice(0, state.contactList.length);
    },
    ///replace the data
    replace:(state, action)=>{
      state.contactList[action.payload.index] = action.payload.contact; 
    }
  }
});

export const contactReducer = contactsSlice.reducer;
export const { add, replace, delete: deleteContact, reset, fetchContactStart, fetchContactSuccess, fetchContactFailure } = contactsSlice.actions;
export const contactSelector = (state: { contactReducer: { contactList: any } }) =>
  state.contactReducer.contactList;

