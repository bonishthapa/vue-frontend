<template>
    <div>
    <div class="category-detail">
        <div class="container">
            <b><h2 class="category-name">Category Detail</h2></b>
            {{scategory}}
            <div class="form-group">
                Name : {{scategory.name}}
            </div>
            <div class="row">
                Products:<br>
                <div class="col-md-4" v-for="(product,index) in scategory.product" :key="index">
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
                            
                            Price: {{product.price}}
                        </div>
                    </div>
                </div>      
            </div>    
        </div>    
    </div>
    </div>  
</template>

<script>
import { mapActions,mapGetters } from "vuex"

export default {
    name:"AdminCategoryDetail",
    methods:{
        ...mapActions(['fetchCategoryDetail']),
        fetchdata(){
            const fetchedId = this.$route.params.id;
            this.fetchCategoryDetail(fetchedId);
        }
    },
    computed:{
        ...mapGetters(['scategory'])
    },
    created(){
        this.fetchdata()
    }

}
</script>

<style>
.category-name{
    padding: 10px;
    text-align: center;
}
</style>