<template>

    <div class="add-product">
        <div class="container">
            <h3>Add Product</h3> 
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" class="form-control" id="Product Name" aria-describedby="emailHelp" placeholder="Enter Product Name" v-model="product.name">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Slug</label>
                    <input type="text" class="form-control" id="Product Name" aria-describedby="emailHelp" placeholder="Enter Product Name" v-model="product.slug">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <!-- <div class="form-group">
                    <label for="exampleInputEmail1">Category</label>
                    <input type="text" class="form-control" id="Product Name" aria-describedby="emailHelp" placeholder="Enter Product Name" v-model="product.category">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div> -->
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Category</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="product.category">
                    <option v-for="(cat,ind) in allCategory" :key="ind" v-bind:value="cat.id">{{cat.name}} </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Price</label>
                    <input type="text" class="form-control" id="Product Name" aria-describedby="emailHelp" placeholder="Enter Product Name" v-model="product.price">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Discount Price</label>
                    <input type="text" class="form-control" id="Product Name" aria-describedby="emailHelp" placeholder="Enter Product Name" v-model="product.discount_price">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <input type="text" class="form-control" id="Product Name" aria-describedby="emailHelp" placeholder="Enter Product Name" v-model="product.description">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Upload Image</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="inputFile">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>    
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name:"AddProduct",
    data(){
        return{
            product:{
                name:"",
                slug:"",
                category:"",
                price:"",
                discount_price:"",
                description:"",
                // image:""
            },
            image:""
        }
    },
    methods:{
        ...mapActions(['addProductAdmin','fetchCategory']),
        inputFile(e){
            console.log(e);
            this.image = e.target.files[0]
            console.log(this.image);
        },
        onSubmit(){
            let fd = new FormData();
            fd.append('image',this.image,this.image.name);
            fd.append('name',this.product.name)
            fd.append('slug',this.product.slug)
            fd.append('category',this.product.category)
            fd.append('price',this.product.price)
            fd.append('discount_price',this.product.discount_price)
            fd.append('description',this.product.description)
            console.log("product",this.product.name);
            this.addProductAdmin(fd)


        }
    },
    computed: mapGetters(['allCategory']),
    created(){
        this.fetchCategory()
    }
}
</script>

<style>

</style>