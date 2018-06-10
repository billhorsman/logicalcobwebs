import Vuex from 'vuex'
import moment from "moment"

const createStore = () => {
  return new Vuex.Store({
    state: {
      rows: [],
      total: 0,
      loading: false,
      lastUpdate: null
    },
    mutations: {
      update (state, data) {
        state.rows = data[0]
        state.total = data[1]
        state.stateOfJar = data[2]
        state.lastUpdate = data[3]
      }
    }
  })
}

export default createStore
