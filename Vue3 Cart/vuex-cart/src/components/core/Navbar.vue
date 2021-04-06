<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/inventory" class="button is-primary">
               <strong> Inventory</strong>
              </router-link>
              <router-link to="/cart"  class="button is-warning">   <p>
    Total cart items:
    <span> {{cartQuantity}}</span> </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>



<!--
The JavaScript is held in the script element, which also handles state management and exports the component.
The getCartItems action gets dispatched when the navbar component is created, updating the store state with all the cart items from the response data received from the server.
After this, the store getters recompute their return values and the cartQuantity gets rendered in the template. 
Without dispatching the getCartItems action on the created life cycle hook, the value of cartQuantity will be 0 until the store state is modified.
-->
<script>
import {mapGetters} from "vuex"
export default {
    name: "Navbar",
    computed: {
    ...mapGetters([
      'cartQuantity'
    ])
  },
  created() {
    this.$store.dispatch("getCartItems");
  }
}
</script>