<template>
  <div class="cart">
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart,index) in allCart" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{ cart.product.name }}</td>
            <td>{{ cart.quantity }}</td>
            <td>{{ cart.product.price }}</td>
            <td>{{cart.totalprice}}</td>
            <td>
              <i class="fas fa-trash-alt" @click="deleteCartItem(cart.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Total Amount: NPR {{totalAmount(allCart)}} </h3>
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
      totalamount:'',
      catId:''
    }
  },
  computed:{
      ...mapGetters(["allCart"]),
      
  },
  methods: {
        ...mapActions(['checkoutPayment','fetchCartItem','deleteCartItem']),
        totalAmount(allCart) {
          let cartItem = allCart;
          // console.log("length of cart", cartItem);
          let total = 0;
          // cartItem.map((item) => {
          //           total += item.totalprice;
          //       });
          cartItem.forEach(item => {
            total +=item.totalprice
          });
          this.totalamount = total
          return total
          // console.log("data total", this.totalamount);
        },
        paymentNow() {
            console.log("clicked paykhalti");
            var config = {
                publicKey: "test_public_key_14c6b85fbc3e4824a196085f5ece64b1",
                productIdentity: "fasdfa",
                productName: "nasjfask",
                productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
                paymentPreference: ["KHALTI"],
                eventHandler: {
                onSuccess(payload) {
                    // hit merchant api for initiating verfication
                    // debuginfo("success", "Success callback received. <br />" + JSON.stringify(payload));
                    // console.log(payload);
                    payNow(payload);
                    // this.checkoutPayment(payload)
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
              console.log(payload.amount);
              const data={
                      amount:payload.amount,
                      token : payload.token
                    }
                this.checkoutPayment(data)
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
    this.fetchCartItem()
   
  }
};
</script>

<style>
.fas{
  cursor: pointer;
}
</style>
