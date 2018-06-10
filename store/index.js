import Vuex from 'vuex'
import moment from "moment"

const createStore = () => {
  return new Vuex.Store({
    state: {
      jars: {}
    },
    mutations: {
      update (state, data) {
        state.jars[data[0]] = data[1]
      }
    }
  })
}

export default createStore
