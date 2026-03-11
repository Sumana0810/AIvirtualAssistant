import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
<<<<<<< HEAD

export const userDataContext = createContext()

function UserContext({ children }) {
    const serverUrl = "http://localhost:8000"
    const [userData, setUserData] = useState(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const handleCurrentUser = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { 
                withCredentials: true,
                timeout: 10000 // 10 second timeout
            })
            setUserData(result.data)
            console.log("User data loaded:", result.data)
        } catch (error) {
            console.error("Error fetching user data:", error)
            setError(error.response?.data?.message || error.message || "Failed to load user data")
            
            // Handle authentication errors
            if (error.response?.status === 401) {
                console.log("User not authenticated")
                setUserData(null)
            }
        } finally {
            setLoading(false)
        }
    }

    const getGeminiResponse = async (command) => {
        try {
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, 
                { command }, 
                { 
                    withCredentials: true,
                    timeout: 15000 // 15 second timeout for AI responses
                }
            )
            return result.data
        } catch (error) {
            console.error("Error getting Gemini response:", error)
            
            // Return a fallback response
            return {
                type: 'error',
                response: "I'm having trouble connecting to my AI service. Please try again.",
                userInput: command
            }
        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

    const value = {
        serverUrl,
        userData,
        setUserData,
        backendImage,
        setBackendImage,
        frontendImage,
        setFrontendImage,
        selectedImage,
        setSelectedImage,
        getGeminiResponse,
        loading,
        error,
        refreshUser: handleCurrentUser // Expose refresh function
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
=======
export const userDataContext=createContext()
function UserContext({children}) {
    const serverUrl="http://localhost:8000"
    const [userData,setUserData]=useState(null)
    const [frontendImage,setFrontendImage]=useState(null)
     const [backendImage,setBackendImage]=useState(null)
     const [selectedImage,setSelectedImage]=useState(null)
    const handleCurrentUser=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getGeminiResponse=async (command)=>{
try {
  const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
  return result.data
} catch (error) {
  console.log(error)
}
    }

    useEffect(()=>{
handleCurrentUser()
    },[])
    const value={
serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
  return (
    <div>
    <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
>>>>>>> 1e71031c1869f6dea2fd69732c629e3451a1d9e6
