<template>
  <div class="category-product">
    <div class="container">
      <div v-if="scategory.product.length > 1">
        <div class="row">
          <div
            class="col-md-4"
            v-for="product in scategory.product"
            :key="product.id"
          >
            <div class="card" style="width: 18rem" v-if="product.is_active">
              <img class="card-img-top" src="" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title" @click="fetchProductDetail(product.id)">
                  <router-link :to="'/productdetail/' + product.id"
                    >{{ product.name }}||{{ product.is_active }}
                  </router-link>
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
      <div v-else-if="(scategory.product.length = 1)">
        <div class="row">
          <div
            class="col-md-4"
            v-for="product in scategory.product"
            :key="product.id"
          >
            <div class="card" style="width: 18rem" v-if="product.is_active">
              <img class="card-img-top" src="" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title" @click="fetchProductDetail(product.id)">
                  <router-link :to="'/productdetail/' + product.id"
                    >{{ product.name }}||{{ product.is_active }}
                  </router-link>
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
        <h4 class="no-item">No Item in Category</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CategoryProduct",
  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },
  methods: {
    ...mapActions(["fetchCategoryDetail"]),
    fetchData() {
      const fetchedId = this.$route.params.id;
      this.fetchCategoryDetail(fetchedId);
    },
  },
  computed: mapGetters(["scategory"]),
  created() {
    this.fetchData();
  },
};
</script>

<style>
.no-item {
  text-align: center;
}
</style>
