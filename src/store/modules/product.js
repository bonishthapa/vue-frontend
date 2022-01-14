import axios from 'axios'

const state = {
    singleproduct:{},
    product:[],
    category:[],
    singlecategory:{},
    cart:[]
}

const getters = {
    allProducts:state=>state.product,
    allCategory:state=>state.category,
    sproduct:state=>state.singleproduct,
    scategory:state=>state.singlecategory,
    allCart:state=>state.cart
}

const actions = {
    async fetchProducts({commit}){
        const response = await axios.get('http://localhost:8080/api/product/');
        commit('setProducts',response.data);
    },
    async fetchCategory({commit}){
        const response = await axios.get('http://localhost:8080/api/category/')
        commit('setCategory', response.data)
    },
    async fetchProductDetail({commit},slug){
        const response = await axios.get(`http://localhost:8080/api/product/${slug}`);
        commit('productDetail',response.data);
    },
    async searchProduct({commit},name){
        console.log("search item",name);
        const response = await axios.get(`http://localhost:8080/api/product/?search=${name}`);
        commit('searchProductlist',response.data);
    },
    async fetchCategoryDetail({commit},id){
        console.log("routed id is ",id);
        const response = await axios.get(`http://localhost:8080/api/category/${id}`)
        console.log("categorydetail",response.data);
        commit('setCategoryDetail', response.data)
    },
    fetchCartitem({commit},cart){
        console.log("cart item in product",cart);
        commit("setCart",cart)
    }
}

const mutations = {
    setProducts:(state,product)=>(state.product=product),
    setCategory:(state,category)=>(state.category=category),
    productDetail:(state,product)=>(state.singleproduct=product),
    searchProductlist:(state,product)=>(state.product=product),
    setCategoryDetail:(state,product)=>(state.singlecategory=product),
    setCart:(state,cart)=>(state.cart=cart)
}


export default{
    state,
    getters,
    actions,
    mutations
}