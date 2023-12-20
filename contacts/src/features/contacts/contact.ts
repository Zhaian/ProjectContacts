import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../api/instance.ts";
import {AxiosRequestConfig, AxiosResponse} from "axios";

export default interface IContact {
    id:string;
    email:string;
    image:string;
    name:string;
    phone:string
}

interface IContactPost {
    email:string;
    image:string;
    name:string;
    phone:string
}

interface IState {
    contacts:IContact[]
    isLoading:boolean
    error:Error | null
}


const initialState:IState = {
    contacts:[],
    isLoading:false,
    error:null
}

export const getContact = createAsyncThunk(
    'contact/get',
    async () => {
        const response = await instance.get('contacts.json')
        const data = response.data
        const options = Object.keys(data).map((val) => {
        return {
            id:val,
            val,...data[val]
        }
    })

    return options
})

export const addNewContact = createAsyncThunk('contact/post', async (payload:IContactPost,{dispatch}) => {
   await instance.post<AxiosRequestConfig,
      AxiosResponse<{
          email:string,
          image:string,
          name:string,
          phone:string
      }>>('contacts.json' , payload)
        await dispatch(getContact())
})

export const editData = createAsyncThunk(
    'dishes/put' ,
    async ({id,payload}:{id:string,payload:IContact}) => {
        const response= await instance.put<AxiosRequestConfig,AxiosResponse>(`contacts/${id}.json`,payload);
        return response.data
    })

export const deleteData = createAsyncThunk('contact/delete', async (id:string,{dispatch}) => {
             await instance.delete(`contacts/${id}.json`);
             await dispatch(getContact())
})

const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(getContact.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getContact.fulfilled,(state,action) => {
                state.isLoading = false;
                state.contacts = action.payload
            })
            .addCase(getContact.rejected,(state,action) => {
                state.isLoading = false;
                state.error = action.error as Error
            })
            .addCase(addNewContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewContact.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as Error;
            })
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteData.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as Error;
            })
            .addCase(editData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editData.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as Error;
            })
    }
})


export const contactReducer = contactSlice.reducer