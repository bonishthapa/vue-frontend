import axios from "axios";

import store from "../index"
import axiosInstance from "../../utils/axiosInstance";


const state = {
  singleproduct: {},
  product: [],
  category: [],
  singlecategory: {},
  cart: [],
};

const getters = {
  allProducts: (state) => state.product,
  allCategory: (state) => state.category,
  sproduct: (state) => state.singleproduct,
  scategory: (state) => state.singlecategory,
  allCart: (state) => state.cart,
};

const actions = {
  async fetchProducts({ commit }) {
    let token = localStorage.getItem("token")
    // let token = store.user.state.token
    // console.log("store token");  
    let header={
      Authorization: 'Bearer '+token
    }
    console.log("local storage",header);
    const response = await axios.get("http://localhost:8080/api/product/");
    commit("setProducts", response.data);
  },
  async fetchCategory({ commit }) {
    const response = await axios.get("http://localhost:8080/api/category/");
    commit("setCategory", response.data);
  },
  async fetchProductDetail({ commit }, slug) {
    const response = await axios.get(
      `http://localhost:8080/api/product/${slug}`
    );
    commit("productDetail", response.data);
  },
  async searchProduct({ commit }, name) {
    console.log("search item", name);
    const response = await axios.get(
      `http://localhost:8080/api/product/?search=${name}`
    );
    commit("searchProductlist", response.data);
  },
  async fetchCategoryDetail({ commit }, id) {
    const response = await axios.get(
      `http://localhost:8080/api/category/${id}/`
    );
    console.log("categorydetail", response.data);
    commit("setCategoryDetail", response.data);
  },
  async addCartitem({ commit }, cart) {
    console.log("parse data",cart); 
    let product = JSON.stringify(cart)
    let token = localStorage.getItem("token")
    const response = await axios({
                      method: 'post',
                      url: 'http://localhost:8080/api/order/',
                      data: {
                        'product':product,
                        'quantity':5,
                      },
                      headers: {'Authorization': 'Bearer '+token}
                    });
    console.log("item", response.data);
    commit("setCart", response.data);
  },
  async fetchCartItem({ commit }) {
    // let token = localStorage.getItem("token")
    // let header={
    //   'Authorization': 'Bearer '+token,
    // }
    const response = await axiosInstance.get('/api/order/')
    console.log("item", response.data);
    commit("setCart", response.data);
  },
  checkoutPayment({commit},payload){
    console.log("payload ma aako",payload);
    const token = payload.token;
    const amount = payload.amount
    const header = {
      Authorization: 'Key test_secret_key_9fe7f92f5fb14f4986435d64938da2a9'
    }
    const data = {
      amount:amount,
      token : token
    }
    const response = axios({
      method: 'post',
      url: 'http://localhost:8080/api/verify/',
      data: data,
      // headers: {'Authorization': 'Bearer '+token}
    });
  },
  async deleteCartItem({commit},id) {
    console.log("delete id is ",id);
    let token = localStorage.getItem("token")
    let header={
      'Authorization': 'Bearer '+token,
    }
    // console.log("fetch");
    const responses = await axios.delete(`http://localhost:8080/api/order/${id}/`,{headers:header})
    // console.log("item", response.data);
    // commit("setCart", response.data);
    const response = await axios.get('http://localhost:8080/api/order/new/',{headers:header})
    console.log("item", response.data);
    commit("setCart", response.data);
  },
  async addProductAdmin({ commit }, product) {
    const response = await axios({
                      method: 'post',
                      url: 'http://localhost:8080/api/product/',
                      data: product
                    });
    console.log("item", response.data);
    commit("setProducts", response.data);
  },
  
};

const mutations = {
  setProducts: (state, product) => (state.product = product),
  setCategory: (state, category) => (state.category = category),
  productDetail: (state, product) => (state.singleproduct = product),
  searchProductlist: (state, product) => (state.product = product),
  setCategoryDetail: (state, product) => (state.singlecategory = product),
  setCart: (state, cart) => (state.cart = cart),
  
};

export default {
  state,
  getters,
  actions,
  mutations,
};
