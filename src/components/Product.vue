<template>
  <div class="product">
    
      <div v-if="allProducts">
        <div class="row">
          <div class="col-md-4" v-for="product in allProducts" :key="product.id">
            <div class="card card-style" style="width: 18rem">
              <img class="card-img-top" src="" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title" @click="fetchProductDetail(product.id)">
                  <router-link :to="'/productdetail/' + product.slug">{{product.name}}</router-link>
                </h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
                <button class="btn btn-primary" @click="addToCart(product)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>  
      </div>
      <div v-else>
          <h4 class="flex-center">No Items Found</h4>
      </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Product",
  // props:['cartItem'],
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchProductDetail", "addCartitem"]),
    addToCart(product) {
      // this.cart.push(product);
      this.addCartitem(product)
    },
    getlogin(){
      this.loginresponse()
    }
  },
  computed: mapGetters(["allProducts","isLoggedUser","loginresponse"]),
  created() {
    this.fetchProducts(),
    this.addCartitem(this.cart);
    console.log("user login",this.isLoggedUser);
    console.log("response",this.loginresponse);
    // this.$forceUpdate()
  },
};
</script>

<style>
.card {
  margin-top: 50px;
  background: #eee;
  padding: 3em;
  line-height: 1.5em;
}
.card-style{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
}
.card-style:hover{
  box-shadow: 0 8px 16px 0 rgba(1,0,3,0.5);
}
</style>
