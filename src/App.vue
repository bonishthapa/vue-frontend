<template>
  <div id="app">
    <div id="nav">
      <!-- <Navbar /> -->
      <Navbar />
      <!-- <Product /> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import Product from '@/components/Product.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  components:{
    Navbar,
  //   // Product
  }
}
</script>
<style>

</style>
