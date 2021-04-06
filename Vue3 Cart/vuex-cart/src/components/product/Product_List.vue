<template>
  <div class="container is-fluid">
    <div class="tile is-ancestor">
      <div class="tile is-parent" v-for="productItem in productItems" :key="productItem.id">
      <ProductListItem :productItem="productItem"/>
      </div>
    </div>
  </div>
</template>



<!--
Similar to the Navbar component logic discussed earlier, here the Vuex mapGetters helper method directly maps store getters with component computed properties to get the productItems data from the store.
The getProductItems action gets dispatched when the ProductList component is created, updating the store state with all the product items from the response data received from the server.
After this, the store getters re-computes their return values and the productItems gets rendered in the template. 
Without dispatching the getProductItems action on the created life cycle hook, there will be no product item displayed in the template until the store state is modified.
-->
<script>
import { mapGetters } from 'vuex';
import Product_List_Item from './Product_List_Item'
export default {
  name: "ProductList",
  components: {
    ProductListItem:Product_List_Item
  },
  computed: {
    ...mapGetters([
      'productItems'
    ])
  },
  created() {
    this.$store.dispatch('getProductItems');
  }
};
</script>