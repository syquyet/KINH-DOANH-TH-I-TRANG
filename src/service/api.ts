import{createAsyncThunk}from "@reduxjs/toolkit"
export const loginUserAsync=createAsyncThunk("login/loginUser", async(credentials:{
    email:string,
    password:string
},thunkAPI:any) => {
    try{
           }
    catch(error){
       
    }
})