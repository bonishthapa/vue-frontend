<template>
    <div class="product">
        <div class="row">
             <div class="col-md-4" v-for="product in allProducts" :key="product.id">
                <div class="card" style="width: 18rem;" >
                    <img class="card-img-top" src="" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title" @click="fetchProductDetail(product.id)"><router-link :to="'/productdetail/'+product.slug">{{product.name}}</router-link></h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
    name: 'Product',
    // props:['cartItem'],
    data(){
        return{
            cart:[]
        }
    },
    methods:{
        ...mapActions(['fetchProducts','fetchProductDetail','fetchCartitem']),
        // fetchProductDetail(id){
        //     console.log("product",id);
        // }
        addToCart(product){
            // console.log("button clicked",product);
            this.cart.push(product)
            // localStorage.setItem("cart",this.cart)
            // this.$emit('cartItem',JSON.stringify(product))
            // this.$emit('newCart',this.cart)
            // console.log("cart item is", this.cart);
        }
    },
    computed:mapGetters(['allProducts']),
    created(){
        this.fetchProducts(),
        this.fetchCartitem(this.cart)
    }
}
</script>

<style>
.card {
  margin-top: 50px;
  background: #eee;
  padding: 3em;
  line-height: 1.5em; 
}
</style>