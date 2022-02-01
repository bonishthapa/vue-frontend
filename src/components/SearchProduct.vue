<template>
  <div class="search-product">
    <div class="container">
      <div v-if="allProducts.length > 0">
        <div class="row">
          <div
            class="col-md-4"
            v-for="product in allProducts"
            :key="product.id"
          >
            <div class="card" style="width: 18rem">
              <img class="card-img-top" src="" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title" @click="fetchProductDetail(product.id)">
                  <router-link :to="'/productdetail/' + product.id">{{
                    product.name
                  }}</router-link>
                </h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <br />
        <h4 class="no-item">No Item in Found</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SearchProduct",
  computed: mapGetters(["allProducts"]),
  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },
  methods: {
    ...mapActions(["searchProduct"]),
    fetchData() {
      const searchquery = this.$route.params.search;
      this.searchProduct(searchquery);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
