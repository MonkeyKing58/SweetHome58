import firebase from 'firebase/compat/app'

export default {
  actions: {

    async login({commit}, {email, pass}) {
      try{
        await firebase.auth().signInWithEmailAndPassword(email, pass)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },

    async register({commit}, {email, pass}) {
      try{
        await firebase.auth().createUserWithEmailAndPassword(email, pass)
        console.log('success')
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },

    getUserId() {
      const USER = firebase.auth().currentUser
      return USER ? USER.uid : null
    },

    async logout() {
      await firebase.auth().signOut()
    }
  }
}