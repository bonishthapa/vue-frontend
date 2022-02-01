<template>
  <div class="admin-home">
      <AdminNavbar />
      <AddProduct />
  </div>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue"
import AddProduct from "./AddProduct.vue"

export default {
    name:"AdminHome",
    components:{
        AdminNavbar,
        AddProduct
    }
}
</script>

<style>

</style>