<template>
  <div class="category-product">
      <!-- <Sidebar /> -->
      <div class="container">
          <b><h3 class="category-name">Category List</h3></b>
          <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Number of Products</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cat,index) in allCategory" :key="index">
                    <th scope="row" >{{index+1}}</th>
                    <td  class="tb-data">{{cat.name}}</td>
                    <td class="tb-data">{{cat.product.length}}</td>
                    <td><router-link :to="'/admin/category/' +cat.id"><i class="fas far fa-eye"></i></router-link><span class="button-space"></span><i class="fas fa-edit"></i><span class="button-space"></span><i class="fas fa-trash-alt"></i></td>
                    </tr>
                </tbody>
            </table>
      </div>
  </div>
</template>

<script>
// import Sidebar from "./Sidebar.vue"
import { mapActions,mapGetters } from "vuex"

export default {
    name:"CategoryProduct",
    components:{
        // Sidebar
    },
    methods:{
        ...mapActions(['fetchCategory'])
    },
    computed: mapGetters(['allCategory']),
    created(){
        this.fetchCategory()
    }
}
</script>

<style>
.category-name{
    padding: 10px;
    text-align: center;
}
.button-space{
    margin-right: 20px;
}
.fas{
    cursor: pointer;
}
</style>