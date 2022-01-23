<template>
  <div class="cart">
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in allCart" :key="cart.id">
            <th scope="row">1</th>
            <td>{{ cart.product.name }}</td>
            <td>{{ cart.product.price }}</td>
            <td>
              <i class="fas fa-trash-alt" @click="deleteCartItem(cart.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Total Amount: NPR </h3>
      <button class="btn btn-primary float-right" @click="paymentNow()">
        Pay via Khalti
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import KhaltiCheckout from "khalti-checkout-web";
// import axios from 'axios';

export default {
  name: "Cart",
  data(){
    return{
      total:'',
      catId:''
    }
  },
  computed:{
      ...mapGetters(["allCart"]),
      
  },
  methods: {
        ...mapActions(['checkoutPayment','fetchCartItem','deleteCartItem']),
        totalAmount(allcart) {
          let cartItem = allcart;
          let total = 0;
          cartItem.map((item) => {
              total += item.price;
          });
          return total;
        },
        totalamountCart(allCart){
          // console.log("toatl",allCart.total);
          
          // allCart.map((item)=>{
          //     return this.total += item.totalprice
          // })
          // console.log("total is ",total);
        },
        paymentNow() {
            console.log("clicked paykhalti");
            var config = {
                publicKey: "test_public_key_79398be049a9407697bd337e8fd664df",
                productIdentity: "fasdfa",
                productName: "nasjfask",
                productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
                paymentPreference: ["KHALTI"],
                eventHandler: {
                onSuccess(payload) {
                    // hit merchant api for initiating verfication
                    // debuginfo("success", "Success callback received. <br />" + JSON.stringify(payload));
                    console.log(payload);
                    payNow(payload);
                },
                // onError (error) {
                //   debuginfo("danger", "Error callback received. <br />" + JSON.stringify(error));
                //     console.log(error);
                // },
                // onClose () {
                //     console.log('widget is closing');
                // }
                },
            };
            var checkout = new KhaltiCheckout(config);

            var paynowkhalti = (amount) => {
                let paisa = 0;
                paisa = amount * 100;
                checkout.show({ amount: paisa });
            };

            paynowkhalti(10);

            var payNow=(payload)=>{
                this.checkoutPayment(payload)
            }

            // var verifyKhaltiPayment = (payload) =>{
            //     console.log("naya",payload);
            //     console.log("new ",payload['token']);
            //     let token = payload['token'];
            //     console.log("token",token);
            //     let amount = payload['amount'];
            //     console.log("amount",amount);
            
            //     let data = {
            //         amount:amount,
            //         token : token
            //     }
            //     let header = {
            //         Authorization: 'test_secret_key_3df3238b25a54caf82687a165170a5fd'
            //     }

            //     axios.post('http:localhost:8080/api/v2/payment/verify/',data,{headers:header})
            // }  


    },
  },
  created(){
    this.fetchCartItem(),
    console.log(localStorage.getItem("isLogin"))
  }
};
</script>

<style>
.fas{
  cursor: pointer;
}
</style>
