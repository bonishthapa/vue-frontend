import axios from "axios";
import routes from '@/router/index'
import jwt_decode from "jwt-decode";







const state={
    token:"",
    // isLogged: localStorage.setItem("isLogin",false),
    loginresponse: true,
    username:""
}

const getters={
    token:(state)=>state.token,
    // isLoggedUser:(state)=>state.isLogged,
    loginresponse:(state)=>state.loginresponse,
    userDetail:(state)=>state.username,
}

const actions={
    async loginUser({ commit }, user) {
        // console.log("user in product", user);
        const response = await axios.post('http://localhost:8080/api/token/',user)
        // console.log("backend login",response.data);
        const user1 = jwt_decode(response.data.access)
        console.log("user is",user1);
        if (response.data.access){
            user = jwt_decode(response.data.access)
            console.log("admin user",user.role);
            if (user.role == 'Admin'){
                
                routes.push({name:"AdminHome"})
            }
            else{
                routes.push({name:"Home"})
            }
            commit("setToken",response.data.access);
            localStorage.setItem("token",response.data.access)
            localStorage.setItem("refresh",response.data.refresh)
            localStorage.setItem("isLogin",true)
            
        }
        else{
            commit("setResponse")
        }
      },
    logoutUser(){
        localStorage.setItem("token","null")
        localStorage.setItem("refresh","null")
        localStorage.setItem("isLogin",false)
        routes.push('/login')
    },
    async fetchUserdetail({commit}){
        let token = localStorage.getItem("token")
        console.log("store token");  
        let header={
            Authorization: 'Bearer '+token
        }
        const response = await axios.get("http://localhost:8080/api/user",{headers:header})
        commit("setUserdetail", response.data)
    }
}

const mutations={
    setToken:(state,data)=>(state.token=data.access,state.isLogged=true),
    setResponse:(state)=>(state.loginresponse=!state.loginresponse,
        console.log("state.response",state.loginresponse)),
    setUserdetail:(state,data)=>(state.username=data)
    
}


export default{
    state,
    getters,
    actions,
    mutations
}



