import axios from 'axios'

export default {

  actions: {
    async fetchFlats({commit}) {
      try {
        const flats = await axios('https://sweethome58.ru/api/fetch_flats.php')
        commit('setFlats', flats.data)
      } catch(e) {
        console.log(e)
        throw e
      }
    },

    async editFlat({commit}, Data) {
      try {
        commit('setFlatById', Data)
        
        let xhr = new XMLHttpRequest()

        const url = "https://sweethome58.ru/api/update_flat.php"

        xhr.open("POST", url, true)

        xhr.setRequestHeader("Content-Type", "application/json")

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(this.responseText)
          }
        }

        let data = JSON.stringify(Data)

        xhr.send(data)

      } catch(e) {
        commit('setError', e)
        throw e
      }
    },

    async addFlat({commit}, flatData) {
      commit('addNewFlat', flatData)

      const url = "https://sweethome58.ru/api/add_new_flat.php"

      let data = JSON.stringify(flatData)
      
      return axios.post(url, data, {
        headers: {
          "Content-Type":"application/json"
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((e) => {
        commit('setError', e)
        throw e
      })

    },

    async removeFlat({commit}, {flatName, flatOwner}) {
      
      commit('removeFlat', flatName)

      const flatData = { flatName, flatOwner }

      const url = "https://sweethome58.ru/api/remove_flat.php"

      let data = JSON.stringify(flatData)
      
      return axios.post(url, data, {
        headers: {
          "Content-Type":"application/json"
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((e) => {
        commit('setError', e)
        throw e
      })

    },

  }
}