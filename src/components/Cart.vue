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
                    <td>{{cart.name}}</td>
                    <td>{{cart.price}}</td>
                    <td><i class="fas fa-trash-alt" @click="deleteItem(cart.id-1)"></i></td>
                    </tr>
                </tbody>
            </table>
            <h3>Total Amount: NPR {{totalAmount(allCart)}}</h3>
            <button class="btn btn-primary float-right" @click="paymentNow">Pay via Khalti</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'Cart',
    computed:mapGetters(['allCart']),
    mounted() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s. SRC = 'https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js';
        document.body.appendChild(s);
    },
    methods:{
        totalAmount(allcart){
            let cartItem = allcart
            let total = 0
            cartItem.forEach((item) => {
            total += item.price
            });
            return total
        },
        deleteItem(index){
            console.log("index",index);
            this.allCart.splice(index,1)
        },
        paymentNow(){
        console.log("clicked paykhalti");
        var config = {
            "publicKey": "test_public_key_14c6b85fbc3e4824a196085f5ece64b1",
            "productIdentity": "fasdfa",
            "productName": "nasjfask",
            "productUrl": "http://gameofthrones.wikia.com/wiki/Dragons",
            "paymentPreference": [
                "KHALTI"
                ],
            "eventHandler": {
                onSuccess (payload) {
                    // hit merchant api for initiating verfication
                    // debuginfo("success", "Success callback received. <br />" + JSON.stringify(payload));
                    console.log(payload);
                    // verifyKhaltiPayment(payload);
                },
                // onError (error) {
                //   debuginfo("danger", "Error callback received. <br />" + JSON.stringify(error));
                //     console.log(error);
                // },
                // onClose () {
                //     console.log('widget is closing');
                // }
            }
        };
        var checkout = new KhaltiCheckout(config)

        var paynowkhalti = (amount) =>{
            let paisa = 0
            paisa = amount * 100;
            checkout.show({amount: paisa});
        }
        
        paynowkhalti(this.totalAmount())

        }
    }
}
</script>

<style>

</style>