// imported the Axios module and set the state.
// The state is a store object that holds the application-level data that needs to be shared between components.
import axios from 'axios';
const state = {
  productItems: []
}


// This creates a mutations object that holds an UPDATE_PRODUCT_ITEMS method that sets the productItems array to the payload value.
const mutations = {
  UPDATE_PRODUCT_ITEMS (state, payload) {
    state.productItems = payload;
  }
}


// Here the getProductItems method sends an asynchronous GET request to the server using the Axios package.
// When the request is successful, the UPDATE_PRODUCT_ITEMS mutation is called with the response data as the payload.
const actions = {
  getProductItems ({ commit }) {
    axios.get(`/api/products`).then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data)
    });
  }
}


// Method productItems that returns the list of product items in the state, followed by productItemById,
//- a higher order function that returns a single product by its id.
const getters = {
  productItems: state => state.productItems,
  productItemById: (state) => (id) => {
    return state.productItems.find(productItem => productItem.id === id)
  }
}


// This collects all your state objects into the productModule object, then exports it as a module. 
const productModule = {
  state,
  mutations,
  actions,
  getters
}

export default productModule;