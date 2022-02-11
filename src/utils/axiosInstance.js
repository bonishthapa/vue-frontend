import axios from "axios"
// import jwt_decode from "jwt-decode"
// import dayjs from "dayjs"


const baseURL = "http://localhost:8080/"

let authToken = localStorage.getItem("token")

const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authToken}`}
})

// axiosInstance.interceptors.request.use(async req =>{
//     console.log("inter");

//     if (authToken !="null"){
//         const user = jwt_decode(authToken)
//         const isExipred = dayjs.unix(user.exp).diff(dayjs()) < 1


//         let refresh_token = localStorage.getItem("refresh")

//         let data = {'refresh':refresh_token}

//         const response = await axios.post("http://localhost:8080/api/token/refresh/",data)

//         localStorage.setItem("token",response.data.access)
//         console.log("token updated");

//         return req
//     }
    
        

    



//     return req
// })

export default axiosInstance;