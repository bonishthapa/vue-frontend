import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Navbar from "../components/Navbar.vue"
// import jwt_decode from 'jwt-decode'

Vue.use(VueRouter);

// const authToken = localStorage.getItem("token")
// if(authToken !="null"){
//   const user = jwt_decode(authToken)
// }

const routes = [
  {
    path: "/",
    name: "Navbar",
    component: Navbar,
    children:[
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        component: About
      },
      {
        path: "/productdetail/:slug",
        name: "ProductDetail",
        component: () => import("../components/ProductDetail.vue"),
      },
      {
        path: "/search/:search",
        name: "SearchProduct",
        component: () => import("../components/SearchProduct.vue"),
      },
      {
        path: "/category/:id",
        name: "CategoryProduct",
        component: () => import("../components/CategoryProduct.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("../components/Cart.vue"),
        beforeEnter: (to, from, next) => {
          let isLogin = localStorage.getItem("isLogin")
          console.log("login",isLogin);
          if (isLogin == 'false'){
            console.log("login fail");
            next("/login")
          }
          else{
            next()
          }
        }
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      let isLogin = localStorage.getItem("isLogin")
      // console.log("login",isLogin);
      if (isLogin == 'true'){
        console.log("login fail");
        next("/")
      }
      else{
        next()
      }
      
    }
  },
  {
    path:"/logout",
    name:"Logout"
  },

  {
    path:"/admin",
    name:"Sidebar",
    component:()=>import("../admin/Sidebar.vue"),
    children:[
      {
        path:"/admin/category",
        name:"AdminCategoryProduct",
        component:()=>import("../admin/ProductCategory.vue"),
      },
      {
        path:"/admin/home",
        name:"AdminHome",
        component:()=>import("../admin/AdminHome.vue")
      },
      {
        path:"/admin/login",
        name:"AdminLogin",
        component:()=>import("../admin/Login.vue")
      },
      {
        path:"/admin/addproduct",
        name:"AddProduct",
        component:()=>import("../admin/AddProduct.vue")
      },
      {
        path:"/admin/category/:id",
        name:"AdminCategoryDetail",
        component:()=>import("../admin/CategoryDetail.vue")
      },
    ],
    // beforeEnter:(to,from,next)=>{
    //   const authToken = localStorage.getItem("token")
    //   if(authToken !="null"){
    //     const user = jwt_decode(authToken)
    //     if (user.role == 'Admin'){
    //       next()
    //     }
    //     else{
    //       next('/')
    //     }
    //   }
    //   else{
    //     next('/')
    //   }
    // }
  },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
