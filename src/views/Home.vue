<template>
  <div class="home">
    <!-- <Navbar :cart="cart"/> -->
    <div class="container">
      <!-- <Product v-for="product in allProducts" :key="product.id" :product="product"/> -->
      <Product @newCart="newCart"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue'
// import Navbar from '@/components/Navbar.vue'
// import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'Home',
  data(){
    return{
      cart:[]
    }
  },
  components: {
    Product,
    // Navbar
  },
  methods:{
    newCart(carts){
      this.cart = carts
      console.log("navbar item",carts);
    }
  }
}
</script>

<style scoped>
/* .home{
  margin-top: 20px;
} */
</style>