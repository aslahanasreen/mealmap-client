import baseUrl from "./baseurl";
import commonApi from "./commonApi";

export const regUser = async(data)=>{
    return await commonApi(`${baseUrl}/reg`,"POST","",data)
}

export const userLogin = async(data)=>{
    return await commonApi(`${baseUrl}/log`,"POST","",data)
}

export const userProfileUpdate = async(data,header) =>{
    return await commonApi(`${baseUrl}/changep`,"PATCH",header,data)
}

export const deactivateUser = async(header)=>{
    return await commonApi(`${baseUrl}/deactivate`,"DELETE",header,{})
}

export const hotelProfileUpdate = async(data,header)=>{
    return await commonApi(`${baseUrl}/edithp`,"PATCH",header,data)
}

export const changePassword = async(data,header)=>{
    return await commonApi(`${baseUrl}/changepass`,"PATCH",header,data)
}

export const addMenu = async(data,header)=>{
    return await commonApi(`${baseUrl}/addm`,"POST",header,data)
}

export const viewMenu = async(header)=>{
    return await commonApi(`${baseUrl}/getm`,"GET",header,"")
}

export const deleteMenu = async(id)=>{
    return await commonApi(`${baseUrl}/dltm/${id}`,"DELETE","",{})
}

export const addDish = async(data,header)=>{
    return await commonApi(`${baseUrl}/addd`,"POST",header,data)
}

export const getDish = async (header)=>{
    return await commonApi(`${baseUrl}/getd`,"GET",header,"")
}

export const dltdish = async(id)=>{
    return await commonApi(`${baseUrl}/dltd/${id}`,"DELETE","",{})
}

export const editDish = async(id,data,header) =>{
    return await commonApi(`${baseUrl}/editd/${id}`,"PUT",header,data)
}

export const getHotels = async()=>{
    return await commonApi(`${baseUrl}/geth`,"GET","","")
}

export const getMenuForUser=async(hid)=>{
    return await commonApi(`${baseUrl}/menuu?hid=${hid}`,"GET","","")
}

export const getDishForUsers = async(search) =>{
    return await commonApi(`${baseUrl}/getdu?search=${search}`,"GET","","")
}

export const getHotelName = async(hid)=>{
    return await commonApi(`${baseUrl}/gethn?hid=${hid}`,"GET","","")
}

export const addOrder = async(data,header)=>{
    return await commonApi(`${baseUrl}/addo`,"POST",header,data)
}

export const getOrdersForUsers = async(header) =>{
    return await commonApi(`${baseUrl}/getou`,"GET",header,"")
}

export const changeStatus = async(id,data) =>{
    return await commonApi(`${baseUrl}/patchs/${id}`,"PATCH","",data)
}

export const orderhistory = async(header)=>{
    return await commonApi(`${baseUrl}/getoy`,"GET",header,"")
}

export const getOrdersForHotel = async(header) =>{
    return await commonApi(`${baseUrl}/getoh`,"GET",header,"")
}

export const deactivateHotel = async(header) =>{
    return await commonApi(`${baseUrl}/deactivathotel`,"DELETE",header,{})
}

export const getUsers = async()=>{
    return await commonApi(`${baseUrl}/getuser`,"GET","","")
}

export const dltUser = async(id) =>{
    return await commonApi(`${baseUrl}/dlt/${id}`,"DELETE","",{})
}

export const addHotel = async(data,header)=>{
    return await commonApi(`${baseUrl}/addh`,"POST",header,data)
}

export const editHotel = async(id,data,header)=>{
    return await commonApi(`${baseUrl}/edith/${id}`,"PUT",header,data)
}

export const dltHotel = async(id)=>{
    return await commonApi(`${baseUrl}/dlth/${id}`,"DELETE","",{})
}

export const razorPayment  = async(data)=>{
    return await commonApi(`${baseUrl}/createpay`,"POST","",data)
}

export const validatePayment = async(data)=>{
    return await commonApi(`${baseUrl}/verifypay`,"POST","",data)
}
