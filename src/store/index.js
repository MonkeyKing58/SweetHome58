import { createStore } from 'vuex'
import axios from 'axios'
// import _flats from './flats.json'
import auth from './auth'
import flatsModule from './flats'

export default createStore({
  state: {
    feedBacks: {},
    error: null,
    userID: null,
    flats: {}
  },
  mutations: {

    removeFlat(state, flatName) {
      const index = state.flats.findIndex(i => i.NAME == flatName)
      state.flats.splice(index, 1)
    },
    
    setFlats(state, flats) {
      state.flats = flats
    },

    setFlatById(state, Data) {
      const index = state.flats.findIndex(i => i.NAME === Data.NAME)
      state.flats[index] = Data
    },

    addNewFlat(state, flatData) {
      
      const newFlat = {
        ABOUT: '',
        ADRESS: flatData.ADRESS,
        BED: flatData.BED,
        BOLER: '0',
        COND: '0',
        COORD: null,
        FISHKA: '',
        FLATLIST: '1',
        KOL_PHOTO: '0',
        KOL_ROOM: flatData.ROOM,
        KOL_SLEEP: flatData.SLEEP,
        MEN: flatData.SLEEP,
        MODERATE: '1',
        NAME: flatData.NAME,
        NEAR_1: null,
        NEAR_1_TIME: null,
        NEAR_2: null,
        NEAR_2_TIME: null,
        NEAR_3: null,
        NEAR_3_TIME: null,
        NEAR_4: null,
        NEAR_4_TIME: null,
        NEAR_5: null,
        NEAR_5_TIME: null,
        NEAR_6: null,
        NEAR_6_TIME: null,
        NEAR_7: null,
        NEAR_7_TIME: null,
        NEAR_8: null,
        NEAR_8_TIME: null,
        NEAR_9: null,
        NEAR_9_TIME: null,
        NEAR_10: null,
        NEAR_10_TIME: null,
        ORDER: '0',
        OWNER_ID: flatData.UID,
        PHOTOS: '',
        PRICE: flatData.PRICE,
        SHORT_NAME: '',
        SLEEP: '',
        SOFA: flatData.SOFA,
        WIFI: '',
        ZABOR: '0',
        all: '0',
        cnt: '0',
        pgu: '0',
        zoo: '0'
      }

      state.flats.push(newFlat)
    },

    setFeedbacks(state, feedBacks) {
      state.feedBacks = feedBacks
    },
    clearFeedBacks(state) {
      state.feedBacks = {}
    },
    
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },

    setUserID(state, id) {
      state.userID = id
    }
  },
  actions: {
    async fetchFeedbacks({commit}) {
      try {
        const feedBacks = await axios('https://sweethome58.ru/api/fetch_feedbacks.php')
        commit('setFeedbacks', feedBacks.data)
      } catch(e) {
        console.log(e)
        throw e
      }
    },

    setUserID({commit}, uid) {
      try {
        commit('setUserID', uid)
      } catch(e) {
        console.log(e)
        throw e
      }
    },

    loadFlats({commit}) {      
      commit('setFlats')
    }
  },
  getters: {
    feedBacks: s => s.feedBacks,
    
    error: s => s.error,
    
    userID: s => s.userID,
    
    flats: s => s.flats
  },
  modules: {
    auth,
    flatsModule
  }
})
