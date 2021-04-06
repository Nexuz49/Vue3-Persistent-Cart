// imported the Axios module and set the state.
// The state is a store object that holds the application-level data that needs to be shared between components.
import axios from 'axios';
const state = {
  cartItems: []
}


// This creates a similar UPDATE_CART_ITEMS for your user’s shopping cart. Note that this follows the Flux architecture style of making references to mutations in capital letters.
const mutations = {
  UPDATE_CART_ITEMS (state, payload) {
    state.cartItems = payload;
  }
}


// Create the getCartItems method, which sends an asynchronous GET request to the server.
// When the request is successful, the UPDATE_CART_ITEMS mutation is called with the response data as the payload.
// The same happens with the removeAllCartItems method, although it makes a DELETE request to the server.
// The removeCartItem and addCartItem methods receives the cartItem object as a parameter for making a DELETE or POST request.
// After a successful request, the UPDATE_CART_ITEMS mutation is called with the response data as the payload.
const actions = {
  getCartItems ({ commit }) {
    axios.get('/api/cart').then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  },
  addCartItem ({ commit }, cartItem) {
    axios.post('/api/cart', cartItem).then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  },
  removeCartItem ({ commit }, cartItem) {
    axios.put('/api/cart/delete', cartItem).then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  },
  removeAllCartItems ({ commit }) {
    axios.delete('/api/cart/delete/all').then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  }
}


// cartItems method, which returns the list of cart items in the state, followed by cartTotal,
//- which returns the computed value of the total amount of cart items available for checkout.
// Finally, the cartQuantity method, which retuns the quantity of items in the cart.
const getters = {
  cartItems: state => state.cartItems,
  cartTotal: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return (cartItem.quantity * cartItem.price) + acc;
    }, 0).toFixed(2);
  },
  cartQuantity: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity + acc;
    }, 0);
  }
}


// This exports the module as cartModule.
    const cartModule = {
  state,
  mutations,
  actions,
  getters
}
export default cartModule;