<template>
  <div class="flat-main-contaner">
    
    <Loader v-if="loading" />

    <div class="content" v-else>

      <div class="flat-header">

          <el-row class="fl-header 1hidden-sm-and-down">
            <el-col :span="16">
              <div class="h1-roboto">{{flatInfo.ADRESS}}</div>
              <h4>{{subtitle}}</h4>
            </el-col>
            <el-col :span="8" class="fl-header__price">
              <div class="h1-roboto">от {{flatInfo.PRICE}} ₽</div>
              <h4>Цена за сутки</h4>
            </el-col>
          </el-row>

          <Slider :imgArray="imgArray"/>
      </div>

      <div class="main-contaner">
        <div class="main-contaner__content">

          <el-row class="flat-info">

            <el-col :md="24" :lg="16" class="md-order-2 sm-order-2 xs-order-2">

              <el-row class="flat-info__text">
                <el-col :span="3" class="flat-info__text__icon" :style="{'background-image' : 'url('+require('@/assets/images/icon/nov.png') + ')'}"></el-col>             
                <el-col :span="21" class="flat-info__text__desc hidden-sm-and-up">
                  <h5>Описание</h5>
                </el-col>
                
                <el-col :xs="24" :sm="21" class="flat-info__text__desc">
                  <h5 class="hidden-xs-only">Описание</h5>
                  <div class="text">{{flatInfo.ABOUT}}</div>
                </el-col>
              </el-row>

              <el-row class="flat-info__text">
                <el-col :span="3" class="flat-info__text__icon" :style="{'background-image' : 'url('+require('@/assets/images/icon/mesto.png') + ')'}"></el-col>
                <el-col :span="21" class="flat-info__text__desc hidden-sm-and-up">
                  <h5>Рядом</h5>
                </el-col>
                
                <el-col :xs="24" :sm="21" class="flat-info__text__desc">
                  <h5 class="hidden-xs-only">Рядом</h5>
                  <el-row
                  v-for="(item, index) in nearlist"
                  :key="index"
                  class="flat-info__near">
                    <div class="flat-info__near__place">{{item.place}}</div>
                    <div class="flat-info__near__time">{{item.time}}</div>
                  </el-row>
                </el-col>
              </el-row>

              <el-row class="flat-info__text">
                <el-col :span="3" class="flat-info__text__icon" :style="{'background-image' : 'url('+require('@/assets/images/icon/er.png') + ')'}"></el-col>
                <el-col :span="21" class="flat-info__text__desc hidden-sm-and-up">
                  <h5>Удобства</h5>
                </el-col>
                
                <el-col :xs="24" :sm="21" class="flat-info__text__desc">
                  <h5 class="hidden-xs-only">Удобства</h5>
                  <div style="white-space: pre-wrap" class="text">{{text_service}}</div>              

                  <el-row class="flat-info__service">
                    <el-col
                    :xs="24" :sm="12"
                    class="flat-info__service__item"
                    v-for="(item, index) in serviceList"
                    :key="index"
                    >
                      <el-row>
                        <el-col :span="4" class="flat-info__service__item__icon" :style="{'background-image' : 'url('+ item.icon + ')'}"></el-col>
                        <el-col :span="20" class="flat-info__service__item__text">{{item.title}}</el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>  
              
              <el-row class="flat-info__text">
                <el-col :span="3" class="flat-info__text__icon" :style="{'background-image' : 'url('+require('@/assets/images/icon/ps.png') + ')'}"></el-col>
                <el-col :span="21" class="flat-info__text__desc hidden-sm-and-up">
                  <h5>Дополнительно</h5>
                </el-col>
                
                <el-col :xs="24" :sm="21" class="flat-info__text__desc">
                  <h5 class="hidden-xs-only">Дополнительно</h5>
                  <div style="white-space: pre-wrap" class="text">{{textSony_1}}</div>
                  <img class="hidden-xs-only" style="margin-top: 1rem; width: 100%" src="@/assets/images/baner-desktop.jpg" alt="Аренда Sony Playstation 4 в г.Пензе">
                  <img class="hidden-sm-and-up" style="margin-top: 1rem; width: 100vw; margin-left: -5vw;" src="@/assets/images/baner-mobile.jpg" alt="Аренда Sony Playstation 4 в г.Пензе">
                  <div style="white-space: pre-wrap" class="text">{{textSony_2}}</div>
                </el-col>
              </el-row>        

            </el-col>

            <el-col :md="24" :lg="8" class="flat-righter md-order-1 sm-order-1 xs-order-1">

              <h1 class="hidden-xs-only" style="text-align:right; margin-top: 2rem; font-family: Roboto">{{flatInfo.ADRESS}}</h1>
              <h4 class="hidden-xs-only" style="text-align:right">{{subtitle}}</h4>

              <div class="flat-righter__price">
                <el-row class="flat-righter__price__item">
                  <el-col :span="12">Цена за сутки</el-col>
                  <el-col :span="12">от {{flatInfo.PRICE}} ₽</el-col>
                </el-row>
                <el-row class="flat-righter__price__item">
                  <el-col :span="12">Количество человек</el-col>
                  <el-col :span="12" class="sleep-place">
                    <div class="sleep-place__icon sleep-place__icon-guest" title="Количество человек"></div>
                    <div class="sleep-place__col">× {{flatInfo.MEN}}</div>
                  </el-col>
                </el-row>
                <el-row class="flat-righter__price__item">
                  <el-col :span="12">Спальные места</el-col>
                  <el-col :span="12" class="sleep-place"> 
                    <div class="sleep-place__icon sleep-place__icon-bed" title="Двуспальная кровать"></div>
                    <div class="sleep-place__col">× {{flatInfo.BED}}</div>
                    <div class="sleep-place__icon sleep-place__icon-sofa" title="Двуспальный диван"></div>
                    <div class="sleep-place__col">× {{flatInfo.SOFA}}</div>
                  </el-col>
                </el-row>
              </div>

              <el-row style="padding-right:0;" class="flat-righter__buttons">
                <el-col :span="24">
                  <a href="tel:+79613517551"><el-button type="default" class="recolor-blue-border" icon="el-icon-phone">+7 (961) 451 75 51</el-button></a>
                </el-col>
                <el-col :span="24">
                  <a href="https://wa.me/79613517551"><el-button type="primary" class="recolor-blue-button" icon="el-icon-chat-dot-round">WhatsApp</el-button></a>
                </el-col>
              </el-row>

              <el-row style="margin: 2rem 0 .5rem 0;" class="hidden-md-and-down">
                <el-col>
                  <router-link to="/">
                    <el-button type="info" plain class="el-icon-bottom" style="width:100%;">Еще квартиры</el-button>
                  </router-link>
                </el-col>
              </el-row>

              <el-row v-if="flatLinks.length" class="hidden-md-and-down">
                <el-col :span="24" v-for="(item, index) in flatLinks" :key="index">
                  <flat-card v-if="item" :flat="item" style="margin:5px 0" />
                </el-col>
              </el-row>

            </el-col>

          </el-row>

          
          <el-row style="margin: 2rem 0 .5rem 0;" class="hidden-lg-and-up">
            <el-col>
              <router-link to="/">
                <el-button type="info" plain class="el-icon-bottom" style="width:100%;">Еще квартиры</el-button>
              </router-link>
            </el-col>
          </el-row>

          <el-row v-if="flatLinks.length" class="hidden-lg-and-up">
            <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in flatLinks" :key="index" class="dop-flats-mobile">
              <flat-card v-if="item" :flat="item"/>
            </el-col>
          </el-row>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import FlatCard from '@/components/FlatCard'
import Slider from '@/components/Slider'
import { mapGetters } from 'vuex'
import { useMeta } from 'vue-meta'

export default {
  name: 'flat',

  props: {
    title: String
  },

  data: () => {
    return {
      text_service: 'Мы заботимся о качестве нашего сервиса. Для Вашего комфорнтого проживания квартира оборудована всем самым необходимым:',
      serviceListBase: [
        { title: 'Гель, шампунь, мыло и др.', icon: require('@/assets/images/icon/bh.png') },
        { title: 'Постельное белье, полотенца', icon: require('@/assets/images/icon/pb.png') },
        { title: 'Подушки, одеяла', icon: require('@/assets/images/icon/pillow.png') },
        { title: 'ЖК телевизор и кабельное TV', icon: require('@/assets/images/icon/tv.png') },
        { title: 'Микроволновая печь', icon: require('@/assets/images/icon/micro.png') },
        { title: 'Электрический чайник', icon: require('@/assets/images/icon/tea.png') },
        { title: 'Утюг, доска, фен', icon: require('@/assets/images/icon/utug.png') },
        { title: 'Посуда и столовые приборы', icon: require('@/assets/images/icon/kit.png') },
        { title: 'Wi-Fi', icon: require('@/assets/images/icon/wifi.png') },
        { title: 'У нас не курят!', icon: require('@/assets/images/icon/smoking.png') },
      ],
      serviceList: [],
      textSony_1: 'Нашим гостям доступна услуга - прокат игровой приставки Sony PlayStation 4 или X-BOX One S с большим набором игр для компании, детей или для одиночного времяпрепровождения. Более подробную информацию уточняйте по телефону.',
      textSony_2: '* Цена указана за 1 сутки.\n** В комплект входят все необходимое для подключения, 2 джойстика и консоль с играми.',

      flatInfo: [],

      imgArray: [],
      nearlist: [],
      colRoom: 0,
      currentSlide: undefined,

      flatLinks: []
   }
  },

  computed: {
    loading() {
      return Boolean(this.flatInfo.length)
    },

    subtitle() {
      switch (+this.flatInfo.KOL_ROOM) {
        case 1: return '1-комнатная квартира'
        case 2: return '2-х комнатная квартира'
        case 3: return '3-х комнатная квартира'
        case 5: return 'Евродвушка'
        default: return ''
      }
    },

    description_ROOM() {
      switch (+this.flatInfo.KOL_ROOM) {
        case 1: return '1-комнатную квартиру'
        case 2: return '2-х комнатную квартиру'
        case 3: return '3-х комнатную квартиру'
        case 5: return 'Евродвушку'
        default: return ''
      }
    },

    ...mapGetters(['flats']),    

  },

  watch: {
    $route(to) {

      const {id} = to.params

      if(to.name === 'flat') {    

        this.flatLinks = this.dopFlats()

        console.log('dopFlats | '+ this.flatLinks)

        this.currentSlide = 0
        setTimeout(() => {
          this.currentSlide = undefined
        },100)

        this.loadInfo(id)

        document.title = `${this.subtitle} | г.Пенза, ул.${this.flatInfo.ADRESS} | SweetHome58 - Посуточная аренда квартир`
      }

    }
  },

  mounted() {  
    
    const {id} = this.$route.params

    this.loadInfo(id)

    useMeta({
      title: `${this.subtitle} | г.Пенза, ул.${this.flatInfo.ADRESS}`,
      description: `Арентовать посуточно ${this.description_ROOM} в г.Пенза. Просторная и чистая, укомплектована всем необходимым для комфортного проживания.`,
      og: {
        description: `Арентовать посуточно ${this.description_ROOM} в г.Пенза. Просторная и чистая, укомплектована всем необходимым для комфортного проживания.`,
        image: `https://sweethome58.ru${this.imgArray[0].url}`,
        url: `sweethome58.ru/flat/${id}`,
        title: `${this.subtitle} | г.Пенза, ул.${this.flatInfo.ADRESS}`
      }
    })

    this.flatLinks = this.dopFlats()
  },

  methods: {
    dopFlats() {
      const flatsCount = this.flats.length
      const arr = []
      let rand = null

      for(let i=0; i<3; i++) {
        rand = Math.floor(Math.random() * flatsCount)
        while(arr.includes(rand)) {
          rand = Math.floor(Math.random() * flatsCount)
        }
        arr.push(rand)
      }
      
      console.log(arr)

      const dopFlats = arr.map(i => this.flats[i])

      return dopFlats
    },

    loadInfo(id) {
      this.flatInfo = this.flats.filter(i => i.NAME === id)[0]

      this.imgArray = []

      if (this.flatInfo.PHOTOS) {
        const photosArr = this.flatInfo.PHOTOS.split(',')

        for(let i=0; i<photosArr.length; i++) {
          this.imgArray.push({
            id: i,
            url: '/images/flats/'+this.flatInfo.OWNER_ID+'/'+id+'/'+photosArr[i]
          })
        }
      } else {
        for (let i=0; i<10; i++) {
          this.imgArray.push({
            id: i,
            url: '/images/no-foto.jpg'
          })
        }
      }

      this.nearlist = []
      
      for (let i=1;i<11;i++) {
        if(this.flatInfo['NEAR_'+i]) {
          const place = this.flatInfo['NEAR_'+i]
          const time = this.flatInfo['NEAR_'+i+'_TIME']

          this.nearlist.push({ place: place, time: time})
        }
      } 

      this.serviceList = [].concat(this.serviceListBase)

      if (this.flatInfo.COND === '1')
        this.serviceList.unshift({ title: 'Кондиционер', icon: require('@/assets/images/icon/cond.png') })

      if (this.flatInfo.ZABOR === '1')
        this.serviceList.unshift({ title: 'Огороженная территория', icon: require('@/assets/images/icon/cam.png') })

      if (this.flatInfo.BOLER === '1')
        this.serviceList.unshift({ title: 'Водонагреватель', icon: require('@/assets/images/icon/boler.png') })

      this.serviceList.unshift({ title: this.flatInfo.SLEEP+' спальные места', icon: require('@/assets/images/icon/bed.png') })

      this.colRoom = (+this.flatInfo.KOL_ROOM === 5) ? '2е' : +this.flatInfo.KOL_ROOM 
      
    }
  },

  components: {
    FlatCard, Slider
  }
}
</script>

<style lang="sass" scoped>

.flat-main-contaner
  display: flex
  flex-wrap: wrap
  width: 100%

.flat-header
  margin-top: 1rem
  display: flex
  flex-wrap: wrap
  width: 100%
  justify-content: center
  
  & .fl-header
    width: 90%
    max-width: 1200px

    &__icon
      background-size: 60% auto
      background-repeat: no-repeat
      background-position: left top

    &__price      
      align-content: flex-end
      display: flex
      flex-wrap: wrap

      & *
        width: 100%
        display: flex
        justify-content: flex-end  

.content
  display: flex
  flex-wrap: wrap
  width: 100vw

.sleep-place
  display: flex
  height: 2rem

  div
    height: 100%

  .sleep-place__col
    font-weight: bold
    font-size: 1.2rem!important
    display: flex
    align-items: center!important
    padding-left: .25rem!important

  .sleep-place__icon
    background-repeat: no-repeat
    background-size: contain
    background-position: center
    width: 2rem

  .sleep-place__icon-bed
    background-image: url(~@/assets/images/icon/bed.png)

  .sleep-place__icon-sofa
    margin-left: 1rem
    background-image: url(~@/assets/images/icon/sofa.png)

  .sleep-place__icon-guest
    background-image: url(~@/assets/images/icon/men.png)!important

.flat-info

  & .el-col
    // border: dotted 1px red
    // padding-bottom: 1rem

  &__text
    margin-top: 2rem
    text-align: justify

    & .el-col
      // border: dotted 1px #000

    &__icon
      background-size: 60% auto
      background-repeat: no-repeat
      background-position: left top

    &__desc
      display: flex
      flex-wrap: wrap 
      align-items: flex-start
      align-content: flex-start

      .text
        white-space: pre-wrap
        margin-top: 2rem
        

  &__near
    display: flex
    flex-wrap: nowrap
    margin-bottom: .5rem
    
    &:nth-of-type(1)
      margin-top: 2rem
    
    & *
      display: flex
      white-space: nowrap

    &__place
      color: $color-theme-blue-dark
      font-weight: bold
      display: flex
      padding-right: .5rem
      width: 100%
      text-align: left
      
      &:after
        content:''
        background-image: linear-gradient(to right, $color-theme-blue-dark 20%, rgba(255,255,255,0) 0%)
        background-position: center
        background-size: 5px 1px
        background-repeat: repeat-x
        width: 100%
        margin-left: .5rem

    &__time
      align-items: center
  
  &__service
    background-color: #fafafa
    width: 100%
    padding: 5px
    border-radius: 5px
    margin-top: 1rem
    box-shadow: inset 0 0 5px #e8e8e8
    border: solid 1px #eee

    &__item
      display: flex

      .el-row
        width: 100%
        margin: 5px
        background-color: #fff
        border-radius: 5px
        box-shadow: 0 0 5px #e8e8e8
        border: solid 1px #eee
        padding: 10px

      &__icon
        background-position: center
        background-size: contain
        background-repeat: no-repeat

      &__text
        padding: 5px 10px
        display: flex
        align-content: center
        align-items: center
        justify-content: flex-start
        text-align: left

.flat-righter
  padding: 0 0 0 3rem
  align-content: flex-start

  &__price
    display: flex
    flex-wrap: wrap
    align-content: flex-start
    border: solid 1px #ddd
    border-radius: 5px
    margin-top: 1rem
    padding: .5rem 1rem

    &__item
      margin: .5rem 0

      & div:nth-of-type(1)
        align-items: center
        display: flex
        font:
          size: 1rem

      & div:nth-of-type(2)
        align-items: flex-end
        justify-content: flex-end
        display: flex
        padding-left: .5rem
        font:
          size: 1.5rem
          weight: bold
  
  &__buttons
    margin-top: 1rem

    .el-col
      margin-bottom: .5rem
      
    button
      width: 100%

</style>