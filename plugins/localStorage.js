import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
      key: 'hourjar',
      paths: []
  })(store)
}
