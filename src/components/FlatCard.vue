<template>
  <el-row @click="gotoFlat(flat.NAME)" class="flat-card">
    <el-row>
      <el-col :xs="11" :sm="24" class="flat-card__img">
        <img v-if="mainPhoto" :src="'/images/flats/'+flat.OWNER_ID+'/'+flat.NAME+'/'+mainPhoto">
        <img v-else :src="'../images/no-foto.jpg'">
      </el-col> 

      <el-col :xs="13" :sm="24" class="flat-card__text">
        <el-row class="flat-card__adress">
          <el-col :xs="9" :sm="8"><i class="el-icon-guide"></i> г.Пенза</el-col>
          <el-col :xs="15" :sm="16">{{flat.ADRESS}}</el-col>
        </el-row>

        <el-row class="flat-card__price">
          <el-col :xs="9" :sm="8"><i class="el-icon-s-finance"></i>за сутки</el-col>
          <el-col :xs="15" :sm="16">от {{flat.PRICE}} ₽ </el-col>
        </el-row>
        
        <el-row class="flat-card__info-wrapper">
          <span class="flat-card__info"> <i class="el-icon-s-home"></i> {{room}}</span>
          <span class="flat-card__info"> <i class="el-icon-user-solid"></i> до {{flat.MEN}} человек</span>
          <span class="flat-card__info" v-if="flat.FISHKA"> <i class="el-icon-s-flag"></i> {{flat.FISHKA}} </span>
        </el-row>
        
      </el-col>
    </el-row>

    <el-row> 
      <el-button 
        v-if="button" 
        class="flat-card__button-edit"
        type="primary"
        plain
        icon="el-icon-edit-outline"
        @click.stop="goToEditor(flat.NAME)"
      >Редактировать</el-button>
    </el-row>
  </el-row>
</template>

<script>

export default({
  name: 'flat-card',
  props: {
    flat: Object,
    button: {
      default: 0
    }
  },
  
  computed: {
    room() {
      switch(this.flat.KOL_ROOM) {
        case '1': return '1 комната'
        case '2': return '2 комнаты'
        case '3': return '3 комнаты'
        case '5': return 'евро-двушка'
      }

      return false
    },

    mainPhoto() {

      if(this.flat.PHOTOS) {
        const photosList = this.flat.PHOTOS.split(',')
        return photosList[0]
      }

      return ''
    }
  },

  methods: {
    gotoFlat(id) {
      this.$router.push('/flat/' + id)
    },

    goToEditor(id) {
      this.$router.push('/editor/' + id)
    }
  }
})

</script>

<style lang="sass" scoped>

.flat-card
  border-radius: 5px
  background-color: #fff
  display: flex
  align-items: flex-start
  align-content: flex-start
  margin: 2px
  overflow: hidden
  box-shadow: 0 0 2px #eee
  padding: 10px
  flex-wrap: wrap!important

  &:hover
    cursor: pointer

    img
      filter: brightness(.8)
      transition-duration: .2s

    .flat-card__adress
      .el-col:nth-of-type(2)
        transition-duration: .2s
        text-decoration: underline



  .el-row
    width: 100%

  &__adress
    margin-bottom: 0.5rem

    .el-col
      display: flex
      align-items: center

    .el-col:nth-of-type(1)
      color: #777
      font-size: .8rem
      font-weight: bold

    & i
      background-color: #ccc
      padding: .35rem
      border-radius: 50%
      color:#fff
      margin-right: 0.5rem
        
    .el-col:nth-of-type(2)
      justify-content: flex-end
      text-align: right
      color: $color-theme-blue-dark
      font:
        size: 1rem
        weight: bold

  &__price
    margin-bottom: 0.5rem

    .el-col
      display: flex
      align-items: center

    .el-col:nth-of-type(1)
      color: #777
      font-size: .8rem
      font-weight: bold

    & i
      background-color: #ccc
      padding: .35rem
      border-radius: 50%
      color:#fff
      margin-right: 0.5rem
        
    .el-col:nth-of-type(2)
      justify-content: flex-end
      color: #333
      font:
        size: 1.5rem
        weight: bold

  &__info
    padding: 0.25rem .5rem
    font-size: .8rem
    border-radius: 5px
    font-weight: bold
    color: $color-theme-blue-dark
    background-color: lighten($color-theme-blue, 30%)
    margin: .25rem .5rem .25rem 0

    &:nth-of-type(2)      
      color: $color-theme-orange-dark
      background-color: lighten($color-theme-orange, 15%)
   
    &:nth-of-type(3)      
      color: #777
      background-color: #eee   

  img
    width: 100%
    display: flex
    margin-bottom: 1rem
    border-radius: 3px 3px 0 0

  &__button-edit
    width: 100%
    margin-top: .5rem

</style>
