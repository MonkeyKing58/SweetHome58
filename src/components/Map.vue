<template>  
  <div id="sh-map" class="map-wrapper"><Loader v-if="loading" /></div>
</template>

<script>
import DG from '2gis-maps'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    loading: true,
    map: null,
    icon1: null,
    icon2: null,
    icon3: null,
    icon5: null,
    markers: [],
    group: null
  }),
  
  computed: {    
    ...mapGetters(['flats']),
  },

  mounted() {
    if(window.innerWidth > window.innerHeight) {
      this.map = new DG.map('sh-map', {
        center: [53.19, 45],	
        zoomControl: false,
        fullscreenControl: false,
        zoom: 12
      })

      this.icon1 = DG.icon({
        iconUrl: require('@/assets/images/icon/1.png'),
        iconSize: [50, 100]
			})

      this.icon2 = DG.icon({
        iconUrl: require('@/assets/images/icon/2.png'),
        iconSize: [50, 100]
			})

      this.icon3 = DG.icon({
        iconUrl: require('@/assets/images/icon/3.png'),
        iconSize: [50, 100]
			})

      this.icon5 = DG.icon({
        iconUrl: require('@/assets/images/icon/5.png'),
        iconSize: [50, 100]
			})


      if(this.flats)
        this.flats.forEach(i => {
          if(i.COORD) {
            let icon = null
            switch(i.KOL_ROOM) {
              case '1': {
                icon = this.icon1
                break
              }
              case '2': {
                icon = this.icon2
                break
              }
              case '3': {
                icon = this.icon3
                break
              }
              case '5': {
                icon = this.icon5
                break
              }
            }

            let xCoord = i.COORD.slice(0, i.COORD.indexOf(','))
            let yCoord = i.COORD.slice(i.COORD.indexOf(',')+2)

            let marker = DG.marker([xCoord, yCoord], {
              icon: icon,
              id: i.NAME
            }).addTo(this.map)

            this.markers.push(marker)

            marker.bindLabel(
              i.ADRESS, {
                offset: [-150, 5]
              }
            )
          }
      })

      this.group = DG.featureGroup(this.markers)

      this.group.addTo(this.map)

      const router = this.$router
      this.group.on('click', function(e) {      
				let name = e.layer.options.id        
        router.push('/flat/'+name);
			})
    
      this.loading = false
    }
  },
  beforeUnmount() {
    if (this.map) this.map.remove()
  }
}

</script>


<style lang="sass" scoped>

.map-wrapper
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  font-size: 2rem
  text-align: center
  padding: 5vw
  color: #555

</style>