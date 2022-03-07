<template>
    <div class="register">
        <div class="container">
            <div class="card">
                <h2>Register</h2>
                <form @submit.prevent="submitForm">
                    <div class="card-body">
                        <div class="form-group">
                            <input type="text" placeholder="First Name" v-model="first_name" />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Last Name" v-model="last_name" />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Address" v-model="address" />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Email" v-model="email" />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Password" v-model="password" @input="handlePassword" />
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Re-Password" v-model="re_password" @input="handlePassword" />
                        </div>
                        <div class="form-group">
                            {{error_message}}
                        </div>
                        <div class="form-group">
                            <button class="button btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Register",
    data(){
        return{
            first_name:null,
            last_name:null,
            address:null,
            email:null,
            password:null,
            re_password:null,
            isError:false,
            error_message:null
        }
    },
    methods:{
        handlePassword(){
            this.isError=false
            this.error_message=null
        },
        submitForm(){
            if(this.email==null){
                console.log("email");
            }
            if (this.password != this.re_password){
                this.isError = true
                this.error_message = "Password Not matched"
                console.log("not matched");
            }
            else{
                console.log("matched");
            }
        }
    },

}
</script>

<style scoped>
input:focus{
    outline: none;
}
.card{
    width: 100%;
    border-radius: 20px;
    box-shadow: 10px 10px 10px rgba(0,0,0,0.2);
}
</style>