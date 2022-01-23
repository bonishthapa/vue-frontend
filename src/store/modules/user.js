import axios from "axios";

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
        if (response.data.access){
            commit("setToken",response.data.access);
            localStorage.setItem("token",response.data.access)
            localStorage.setItem("isLogin",true)
            // this.$router.push({name:"Home"})
        }
        else{
            commit("setResponse")
        }
      },
    logoutUser(){
        localStorage.removeItem("token")
        localStorage.setItem("isLogin",false) 
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