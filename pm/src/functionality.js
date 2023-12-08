import axios from "axios"
const  baseUrl=import.meta.env.VITE_base_url
export const getUserCreatedPasswords=async(id,token)=>{
       const response=await axios(`${baseUrl}users/passwords/${id}/get`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"get"
       })
       return response.data
      
}

export const createNewPassword=async(token,formData)=>{
       const {username,password,link}=formData
       const response=await axios(`${baseUrl}users/passwords/create`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              data:{
                     "username":username,"password":password,"link":link
              }
       })
       return response.data
}

export const GetAuthorization=async (id,token,formData,retrievePassword)=>{
       const response=await axios(`${baseUrl}users/Password/${id}/Access/${retrievePassword}`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              data:formData
       })
       return response.data
}

export const updatePassword=async(id,token,formData)=>{
       const response=await axios(`${baseUrl}users/password/${id}/update`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              data:formData
       })
       return response.data

}

export const sharePassword=async(id,token,formData)=>{
       console.log(id)
       const response=await axios(`${baseUrl}users/passwords/${id}/share`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              data:formData
       })
       return response
}

export const getUserSharedPasswords=async(id,token,)=>{
       const response=await axios(`${baseUrl}users/passwords/${id}/sharedpasswords`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"get",
             
       })
       return response.data
}

export const changeUserPin=async(token,formData)=>{
       const response=await axios(`${baseUrl}users/pin/change`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              data:formData
             
       })
       return response.data
}

export const removeUserFromPassword=async(passwordid,id,token)=>{
       const response=await axios(`${baseUrl}users/passwords/${passwordid}/${id}/remove`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              
             
       })
       return response.data
}

export const createUserAccount=async(details,token)=>{
       const response=await axios(`${baseUrl}users/create`,{
              headers:{
                     "Authorization": `Bearer ${token}`
              },
              method:"post",
              data:details
              
             
       })
       return response.data
}
  
