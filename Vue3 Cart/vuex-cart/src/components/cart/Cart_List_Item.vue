<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <div class="box">
    <div class="cart-item__details">
      <p class="is-inline">{{cartItem.title}}</p>
      <div>
        <span class="cart-item--price has-text-info has-text-weight-bold">
          ${{cartItem.price}} X {{cartItem.quantity}}
        </span>
|
        <span>
          <i class="fa fa-arrow-circle-up cart-item__modify" @click="addCartItem(cartItem)"></i>
          &nbsp; <!-- Invisible Char -->
          <i class="fa fa-arrow-circle-down cart-item__modify" @click="removeCartItem(cartItem)"></i> <!-- Button is working, Problem with HTTP Request associated with the action removeCartItem --> 
        </span>
      </div>

    </div>
  </div>
</template>



<!--
Using the mapAction helper function to map the component method to the addCartItem and removeCartItem actions in the store.
-->

<script>
import { mapActions } from 'vuex';
export default {
  name: 'CartListItem',
  props: ['cartItem'],
  methods: {
    ...mapActions([
      'addCartItem',
      'removeCartItem'
    ])
  }
}
</script>