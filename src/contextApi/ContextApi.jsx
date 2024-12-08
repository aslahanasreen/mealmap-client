import React from 'react'
import { useState, createContext } from 'react'

export const userAuthContext = createContext()
export const addDishContext = createContext()
export const editDishContextApi = createContext()
export const hotelIdContext = createContext()
export const dishDetailsContext = createContext()
export const editHotelContext = createContext()


function ContextApi({children}) {

    const [authResponse,setAuthResponse] = useState(false)
    const [addDishC,setAddDishC] = useState("")
    const [editDishResponse,setEditDishResponse] = useState("")
    const [hotelIdResponse,setHotelIdResponse] = useState({
        hid:""
    })
    const [dishResponse,setDishResponse] = useState("")
    const [editHotelResponse,setEditHotelResponse] = useState("")

    return (
        <>
            <userAuthContext.Provider value={{ authResponse,setAuthResponse }}>
                <addDishContext.Provider value={{addDishC,setAddDishC}}>
                    <editDishContextApi.Provider value={{editDishResponse,setEditDishResponse}}>
                        <hotelIdContext.Provider value={{hotelIdResponse,setHotelIdResponse}}>
                            <dishDetailsContext.Provider value={{dishResponse,setDishResponse}}>
                                <editHotelContext.Provider value={{editHotelResponse,setEditHotelResponse}}>
                                    {children}
                                </editHotelContext.Provider>
                            </dishDetailsContext.Provider>
                        </hotelIdContext.Provider>
                    </editDishContextApi.Provider>
                </addDishContext.Provider>
            </userAuthContext.Provider>
        </>
    )
}

export default ContextApi