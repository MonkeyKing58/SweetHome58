<template>
  <div>
    
    <!-- <Loader v-if="loading" />     -->

    <el-row v-if="!loading" class="home">
      <el-col :md="0" :lg="10" class="map hidden-md-and-down">
        <Map />
      </el-col>
      <el-col :md="24" :lg="14" class="list">
        <div class="list__wrapper" id="list__wrapper__id">

          <!-- filter-room -->
          <el-row class="list__filter">
            <div :span="4" class="list__filter__title">Количество комнат</div>
            <div :span="19" class="list__filter__items">
              <div class="list__filter__item" @click="filterRoom = 0" :class="{'list__filter__item--active' : filterRoom === 0}"><i class="p_r el-icon-files"></i>Все <span>{{flatCount.one+flatCount.two+flatCount.three}}</span></div>
              <div class="list__filter__item" @click="filterRoom = 1" :class="{'list__filter__item--active' : filterRoom === 1}"><i class="p_r el-icon-s-home"></i>1 <span>{{flatCount.one}}</span></div>
              <div class="list__filter__item" @click="filterRoom = 2" :class="{'list__filter__item--active' : filterRoom === 2}"><i class="p_r el-icon-s-home"></i>2 <span>{{flatCount.two}}</span></div>
              <div class="list__filter__item" @click="filterRoom = 3" :class="{'list__filter__item--active' : filterRoom === 3}"><i class="p_r el-icon-s-home"></i>3 <span>{{flatCount.three}}</span></div>
            </div>
          </el-row>

          <!-- filter-near -->
          <el-row class="list__filter">
            <div class="list__filter__title">Рядом с</div>
            <div class="list__filter__items">
              <div class="list__filter__item" @click="filterNear = 0" :class="{'list__filter__item--active' : filterNear === 0}"><i class="p_r el-icon-files"></i>Все <span>{{flatCount.one+flatCount.two+flatCount.three}}</span></div>
              <div class="list__filter__item" @click="filterNear = 1" :class="{'list__filter__item--active' : filterNear === 1}"><i class="p_r el-icon-office-building"></i>ПГУ <span>{{flatCount.pgu}}</span></div>
              <div class="list__filter__item" @click="filterNear = 2" :class="{'list__filter__item--active' : filterNear === 2}"><i class="p_r el-icon-location-information"></i>Центр <span>{{flatCount.cnt}}</span></div>
              <div class="list__filter__item" @click="filterNear = 3" :class="{'list__filter__item--active' : filterNear === 3}"><i class="p_r el-icon-camera"></i>Зоопарк <span>{{flatCount.zoo}}</span></div>
            </div>
          </el-row>

          <el-row class="list__contaner" v-if="flatsArray">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="(item, index) in flatsArray" :key="index">
              <flat-card :flat="item"/>
            </el-col>
          </el-row>

          <el-row class="no-flats" v-else>
            <i class="el-icon-loading" style="margin-right: .5rem;" ></i> 
            Кватриры не найдены :(
          </el-row>

        </div>
        <Footer />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Map from '@/components/Map'
import FlatCard from '@/components/FlatCard'
import { mapGetters } from 'vuex'
import { useMeta } from 'vue-meta'  

export default {

  name: 'Home',

  data: () => {
    return {
      loading: true,
      filterRoom: 0,
      filterNear: 0
    }
  },
  
  computed: {    
    ...mapGetters(['flats']),

    flatsArray() {
      
      if(this.flats) {
        let arr = this.flats

        if(!this.filterRoom && !this.filterNear) {
          return arr
        }
        else {
          if(this.filterRoom) {
            arr = arr.filter(i => {
              return ((+i.KOL_ROOM === this.filterRoom) || (+i.KOL_ROOM === this.filterRoom+3))
            })
          }
          if(this.filterNear) {
            arr = arr.filter(i => {
              switch (this.filterNear) {
                case 1: { return +i.pgu }
                case 2: { return +i.cnt }
                case 3: { return +i.zoo }
              }
            })
          }
        }
        return arr
      }
      return null
    },

    flatCount() {

      if(this.flats) {
        const one = this.flats.filter(i => +i.KOL_ROOM === 1).length || 0
        const two = this.flats.filter(i => +i.KOL_ROOM === 2).length + this.flats.filter(i => +i.KOL_ROOM === 5).length || 0
        const three = this.flats.filter(i => +i.KOL_ROOM === 3).length || 0

        const pgu = this.flats.filter(i => +i.pgu).length || 0
        const cnt = this.flats.filter(i => +i.cnt).length || 0
        const zoo = this.flats.filter(i => +i.zoo).length || 0

        return {
          one: one,
          two: two,
          three: three,
          pgu: pgu,
          cnt: cnt,
          zoo: zoo
        }
      }

      return {
          one: 0,
          two: 0,
          three: 0,
          pgu: 0,
          cnt: 0,
          zoo: 0
      }
    }
  },

  mounted() {    
    
    useMeta({
      title: 'Квартиры в Пензе',
      description: 'Аренда квартир в г.Пенза по суткам. Чистые и уютные квартиры в новых домах для гостей города Пенза и для тех, кто в командировке. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
      og: {
        description: 'Аренда квартир в г.Пенза по суткам. Чистые и уютные квартиры в новых домах для гостей города Пенза и для тех, кто в командировке. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
        image: require('@/assets/images/og-image.jpg'),
        url: 'sweethome58.ru',
        title: 'Квартиры в Пензе | Посуточная аренда квартир'
      }
    })    
    
    const {filter} = this.$route.params

    if (filter) {
      switch(filter) {
        case '1' : {
          this.filterRoom = 1
          this.filterNear = 0
          break
        }
        case '2' : {
          this.filterRoom = 2
          this.filterNear = 0
          break
        }
        case '3' : {
          this.filterRoom = 3
          this.filterNear = 0
          break
        }
        case '11' : {
          this.filterNear = 1
          this.filterRoom = 0
          break
        }
        case '12' : {
          this.filterNear = 2
          this.filterRoom = 0
          break
        }
        case '13' : {
          this.filterNear = 3
          this.filterRoom = 0
          break
        }
      }
    }

    this.loading = false
    
  },

  watch: {
    $route(to) {
      
      if(to.name === 'Home') {

      const {filter} = to.params

      if (filter) {
        switch(filter) {
          case '1' : {
            this.filterRoom = 1
            this.filterNear = 0
            break
          }
          case '2' : {
            this.filterRoom = 2
            this.filterNear = 0
            break
          }
          case '3' : {
            this.filterRoom = 3
            this.filterNear = 0
            break
          }
          case '11' : {
            this.filterNear = 1
            this.filterRoom = 0
            break
          }
          case '12' : {
            this.filterNear = 2
            this.filterRoom = 0
            break
          }
          case '13' : {
            this.filterNear = 3
            this.filterRoom = 0
            break
          }
        }
      }

      }
    }
  },

  components: {
    Footer, FlatCard, Map
  }
}
</script>

<style lang="sass" scoped>

.no-flats
  width: 100%
  text-align: center
  justify-content: center
  background-color: #fff
  color: #aaa
  font-size: 1rem
  height: 5rem
  align-items: center

.p_r
  padding-right: 0.2rem

.home
  overflow: hidden
  flex: 1 1 auto
  width: 100%
  display: flex
  justify-content: center
  align-items: flex-start
  height: calc( 100vh - 5.5rem )

.map
  background-color: #ddd
  height: 100%  
  display: flex
  justify-content: center
  align-items: center
  font:
    size: 3rem
    weight: bold

.list
  position: relative
  height: 100%
  overflow-y: auto
  max-width: 100vw

  &__contaner
    width: 100%
    padding: 2px
    box-shadow: $box-shadow-default-inset

    .el-col
      display: flex

  &__wrapper
    width: 100%
    background-color: #f5f5f5
    display: flex
    flex-wrap: wrap
    align-content: flex-start
  
  &__filter
    min-height: 3rem
    background-color: #fff
    width: 100%
    display: flex
    flex-wrap: nowrap
    padding: .5rem 2rem 0 2rem
    justify-content: flex-start
    overflow: hidden

    &:nth-last-of-type(1)      
      box-shadow: 0 5px 5px #e8e8e8    

    div
      display: flex
      align-items: center
      font-weight: bold
      font-size: .9rem

    &__title
      color: $color-theme-blue-dark
      width: 10rem
      min-width: 10rem
      justify-content: flex-end
      text-align: right
      display: flex
      margin-right: 1rem

    &__items
      width: 100%
      flex-wrap: wrap
      display: flex
      justify-content: flex-start

    &__item
      color: $color-theme-blue-dark
      filter: grayscale(1)
      opacity: .55
      transition-duration: .2s
      text-align: left
      margin: 0.25rem .5rem .25rem .5rem

      span
        border-radius: 1rem
        background-color: lighten($color-theme-blue, 30%)
        text-align: center
        font-size: .8rem
        padding: 0.2rem .5rem
        margin-left: 0.25rem

      &:hover
        cursor: pointer
        filter: none
        opacity: 1

    &__item--active
      filter: none
      opacity: 1

    

</style>