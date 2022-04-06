<template>
  <div class="feedback-item">
    <el-row>
      <el-col :xs="22" :sm="22" :md="11" :style="{'order' : order}" class="xs-order-2 sm-order-2">
        <div>
          <div class="feedback-item__body">
            <div class="feedback-item__body__title">{{feedback.NAME}}</div>
            <div class="feedback-item__body__date">{{feedback.DATE}}</div>
            <div class="feedback-item__body__text">{{feedback.TEXT}}</div>
            <router-link v-if="feedback.FLAT_LINK" :to="'/flat/'+feedback.FLAT_LINK" class="feedback-item__body__flat">
              <img height="100" :src="feedbackIMG">
              <div> 
                <div>{{feedback.FLAT_ROOM}}</div>
                <div>{{feedback.FLAT_ADRESS}}</div>
                <div>Подробнее</div>
              </div>
            </router-link>
            <div v-else class="feedback-item__body__flat">
              <img height="100" :src="feedbackIMG">
              <div> 
                <div>{{feedback.FLAT_ROOM}}</div>
                <div>{{feedback.FLAT_ADRESS}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" class="feedback-item__separator xs-order-1 sm-order-1">
        <div class="feedback-item__separator__line"></div>
        <div class="feedback-item__separator__circle"></div>
      </el-col>
      <el-col :sm="0" :md="11" :style="{'order' : 4-order}" class="xs-order-3 sm-order-3"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'feedback-item',
  props: ['order', 'feedback', 'wrapperPhoto'],

  computed: {
    feedbackIMG() {
      if (this.wrapperPhoto) {
        return '../images/flats/'+this.wrapperPhoto
      }
      return require('@/assets/images/no-foto.jpg')
    }
  }
}
</script>

<style lang="sass" scoped>

.feedback-item
  width: 100%
  display: flex

  &:nth-of-type(n+2)
    margin-top: -100px

  &__body
    background-color: #fff
    border-radius: 5px
    box-shadow: 0 0 5px #e8e8e8
    border: solid 1px #eee
    margin: 5px 0
    display: flex
    flex-wrap: wrap
    align-content: flex-start
    padding: 10px
  
    div
      width: 100%

    &__title
      font:
        family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif
        weight: bold
        size: 1.2rem
      color: $color-theme-blue-dark

    &__date
      font:
        family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif
        size: .8rem
      color: #aaa
      margin-top: .25rem
      margin-bottom: 1rem

    &__text
      font-size: .9rem
      color: #333
      padding-bottom: .5rem
      margin-bottom: .5rem
      border-bottom: solid 1px #eee
      white-space: pre-wrap

    &__flat
      margin-top: .3rem
      display: flex
      width: 100%        
      cursor: pointer
      z-index: 1

      img
        border-radius: 3px

      div
        margin-left: .5rem
        align-content: flex-start
        display: flex
        flex-wrap: wrap
        flex-direction: column

        div:nth-of-type(1)
          font-size: .8rem
          color: #777

        div:nth-of-type(2)
          font-size: .9rem
          font-weight: bold
          color: #333

        div:nth-of-type(3)              
          flex: 1 1 auto
          justify-content: flex-end
          display: flex
          color: #409EFF
          font-size: .9rem


  &__separator
    justify-content: center
    display: flex
    order: 2

    &__line
      border-left: solid 2px $color-theme-blue
      width: 0
      height: 100%
      position: absolute

    &__circle
      background-color: $color-theme-blue
      width: 15px
      height: 15px
      border-radius: 50%
      margin-top: 1rem

</style>