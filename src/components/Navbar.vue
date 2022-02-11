<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" to="/"><img src="../assets/logo.png" style="height:40px"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="navbar-brand" to="/"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Category
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <div v-for="category in allCategory" :key="category.id">
                <router-link
                  class="dropdown-item"
                  :to="'/category/' + category.id"
                  >{{ category.name }}</router-link
                >
              </div>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="search"
          />
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            @click.prevent="onSubmit"
          >
            Search
          </button>
        </form>
        <span></span>
        <div class="float-right">
          <button type="button" class="btn btn-pay" @click="onlinePay">
            <i class="fa" style="font-size: 24px">&#xf07a;</i
            ><span class="badge badge-warning" id="lblCartCount"
              >{{ allCart.length }}
            </span>
          </button>
        </div>
      <div>
      
        <ul class="navbar-nav mr-auto">
          <div class="navbar-nav mr-auto" v-if="logined() === 'false'">
          <li class="nav-item">Register</li>
          <li class="nav-item" @click="loginUser">Login</li>  
          </div>
          <div v-if="logined() === 'true'">
              <li class="nav-item" @click="logoutUsers">Logout</li>
              <li class="nav-item">{{userDetail.result}}</li>
          </div>
        </ul>  
      </div>
      </div>
    </nav>
    <router-view></router-view>
    <Footer />
  </div>  
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Footer from "../components/Footer.vue"
export default {
  name: "Navbar",
  props: ["cart"],
  components:{
    Footer
  },
  data() {
    return {
      search: "",
      isLogin:""
    };
  },
  methods: {
    ...mapActions(["fetchCategory", "searchProduct","logoutUser","fetchUserdetail",,"fetchCartItem"]),
    onSubmit() {
      // this.searchProduct(this.search),
      this.$router.push({
        name: "SearchProduct",
        params: { search: this.search },
      }),
        (this.search = "");
    },
    onlinePay() {
      this.$router.push({ name: "Cart" });
    },
    loginUser(){
      console.log("login");
      this.$router.push({ name: "Login" })
    },
    logoutUsers(){
      console.log("logout");
      this.logoutUser()
      // this.$router.push('/')
      // window.location.reload();
    },
    logined(){
      const loginuser = localStorage.getItem("isLogin")
      return loginuser
    }
  },
  computed:{
    ...mapGetters(["allCategory", "allCart","userDetail"]),
    
  },
  created() {
    this.fetchCategory();
    this.fetchUserdetail(),
    this.fetchCartItem()
  }
};
</script>

<style>
.navbar {
  background-color: #b3b3b3;
}
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
  font-size: 12px;
  background: #ff0000;
  color: #fff;
  padding: 0 5px;
  vertical-align: top;
  margin-left: -10px;
}
.btn-pay {
  background-color: transparent;
}
.nav-item{
  cursor: pointer;
}
</style>
