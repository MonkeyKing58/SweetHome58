<template>
  <div class="flatlist">
    
    <Loader v-if="loading" />

    <div v-else class="flatlist__list">

      <el-row
        v-for="flat in flatArray"
        :key="flat.NAME"
        class="flatlist-item"
      >
        <el-col :span="7" @click="gotoFlat(flat.NAME)" class="flatlist-item__img" :style="{ backgroundImage: `url(${wrapperPhoto(flat.NAME)})` }"></el-col>
        <el-col :span="3" @click="wifi(flat.WIFI, flat.SHORT_NAME)" :offset="1" class="flatlist-item__icon" :style="{ backgroundImage: 'url('+require(`@/assets/images/icon/docs.png`)+')' }"></el-col>
        <el-col :span="7" class="flatlist-item__text">
          <div>{{flat.SHORT_NAME}}</div>
          <div>{{kolRoom(flat.KOL_ROOM)}}</div>
        </el-col>
        <el-col :span="3" @click="link(flat.NAME, flat.SHORT_NAME)" class="flatlist-item__icon" :style="{ backgroundImage: 'url('+require(`@/assets/images/icon/link.png`)+')' }"></el-col>
        <el-col :span="3" @click="shareLink(flat.NAME)" class="flatlist-item__icon" :style="{ backgroundImage: 'url('+require(`@/assets/images/icon/share.png`)+')' }"></el-col>
      </el-row>

    </div>
    
    <!-- <div class="flatlist__lower-pillow"></div> -->
    <div class="flatlist__lower">
      <div @click="setFilter(1)" class="flatlist__lower__item" :class="{'flatlist__lower__item-active': filter===1}">1</div>
      <div @click="setFilter(2)" class="flatlist__lower__item" :class="{'flatlist__lower__item-active': filter===2}">2</div>
      <div @click="setFilter(5)" class="flatlist__lower__item" :class="{'flatlist__lower__item-active': filter===5}">2e</div>
      <div @click="setFilter(3)" class="flatlist__lower__item" :class="{'flatlist__lower__item-active': filter===3}">3</div>
      <div @click="setFilter(0)" class="flatlist__lower__item" :class="{'flatlist__lower__item-active': filter===0}">Все</div>

      <div class="flatlist__lower__active" :style="{ transform: 'translateX(calc((100vw - 1rem) / 5 * '+transformStep +')' }"></div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'flatlist',

  data: () => {
    return {
      loading: true,
      filter: 0
    }
  },

  computed: {    
    ...mapGetters(['flats', 'userID']),

    flatsID() {
      let arr = []

      this.flats.map(i => {
        if(i.OWNER_ID === this.userID)
          arr.push(i)
      })

      return arr
    },

    flatArray() {
      if (!this.filter)
        return this.flatsID

      let arr = this.flatsID

      arr = arr.filter(i => {
        return (+i.KOL_ROOM === this.filter)
      })

      return arr
    },

    transformStep() {
      switch(this.filter) {
        case 1: return 0
        case 2: return 1
        case 3: return 3
        case 5: return 2
        default: return 4
      }
    }
  },

  mounted() {

    document.body.style.backgroundColor = '#eee'
    
    this.loading = false

  },

  unmounted() {

    document.body.style.backgroundColor = '#fff'

  },

  methods: {
    kolRoom(i) {
      switch(+i) {
        case 1: return '1 ком.'
        case 2: return '2 ком.'
        case 3: return '3 ком.'
        case 5: return 'Евро'
        default: return ''
      }
    },

    wrapperPhoto(flatName) {
      const flatInfo = this.flatsID.find(i => i.NAME === flatName)

      if(flatInfo && flatInfo.PHOTOS) {
        const photosList = flatInfo.PHOTOS.split(',')
        return '../images/flats/'+ this.userID + '/' + flatName+'/'+photosList[0]
      }

      return '../images/no-foto.jpg'
    },

    setFilter(i) {
      this.filter = i
    },

    gotoFlat(id) {
      this.$router.push('/flat/' + id)
    },

    wifi(text, flat) {
      navigator.clipboard.writeText(text)
      
      this.$message({
        dangerouslyUseHTMLString: true,
        showClose: true,
        duration: 1000,
        offset: 10,
        message: '<b>Квартира '+flat+'.</b><br> Wi-Fi скопирован',
        type: 'warning',
        center: true
      });
    },

    link(text, flat) {
      navigator.clipboard.writeText('https://sweethome58.ru/flat/'+text)
      
      this.$message({
        dangerouslyUseHTMLString: true,
        showClose: true,
        duration: 1000,
        offset: 10,
        message: '<b>Квартира '+flat+'.</b><br> Ссылка скопирована',
        type: 'success',
        center: true
      });
    },

    shareLink(flat) {
    if (navigator.share) {
          navigator.share({
              url: 'https://sweethome58.ru/flat/' + flat
          })
      }
    }
  },

  components: {
  }
}
</script>


<style scoped lang="sass">

.flatlist
  background-color: #eee
  height: 100%
  min-height: 100vh

  &__list
    width: 100%
    display: flex
    flex-wrap: wrap
    padding: .25rem 0

  &__lower-pillow
    height: 3.5rem
    position: fixed
    background-color: #eee
    bottom: 0
    z-index: 100
    width: 100%
    display: flex

  &__lower
    height: 3.5rem
    position: fixed
    background-color: $color-theme-blue
    bottom: 0
    z-index: 100
    width: calc(100vw - 1rem)
    display: flex
    padding: .5rem 0 0 0
    box-shadow: inset 0 2px 2px rgba(255, 255, 255, .5)
    border-radius: 1.25rem 1.25rem 0 0
    margin: 0 .5rem

    &__item
      display: flex
      width: 100%
      margin: 0 .5rem
      font-size: 1.2rem
      font-weight: bold
      color: #fff
      align-items: center
      justify-content: center
      z-index: 5

    &__item-active
      color: $color-theme-blue_dark

    &__active
      position: absolute
      background-color:#fff
      opacity: .9
      height: 3rem
      bottom: 0
      width: calc((100vw - 1rem) / 5 - 1rem )
      left: .5rem
      z-index: 3
      border-radius: 1rem 1rem 0 0
      transition-duration: .3s
      box-shadow: inset 0 0 2px #555

.flatlist-item
  height: 6rem
  background-color: #fff
  display: flex
  width: 100% 
  margin: .25rem .5rem
  border-radius: .5rem
  padding: .5rem

  &__img
    border-radius: .35rem
    background-size: cover
    background-position: center
    background-repeat: no-repeat

  &__icon
    background-size: 60% auto
    background-position: center
    background-repeat: no-repeat

  &__text
    display: flex
    flex-wrap: wrap

    div
      width: 100%
      display: flex
      justify-content: center
      text-align: center
      color: #555

      &:nth-of-type(1)
        align-items: flex-end
        font-weight: bold
        padding-bottom: .25rem

</style>