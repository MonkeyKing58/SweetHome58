<template>
  <el-footer class="footer">
    <el-row class="footer-row__links">
      <el-row align="middle" :gutter="20">
        <el-col :xs="24" :sm="8">
          <router-link
            tabindex="-1"
            class="footer__link"
            v-for="(item, index) in footerLink_1"
            :key="index"
            :to="item.link">
            {{item.title}}
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="8">
          <router-link
            tabindex="-1"
            class="footer__link"
            v-for="(item, index) in footerLink_2"
            :key="index"
            :to="{name: 'Home', params: { filter: item.filter } }">
            {{item.title}}
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="8" class="button-col">
          <div>Свяжитесь с нами:</div>
          <div>
            <a href="tel:+79613517551"><el-button type="default" class="recolor-blue-border" icon="el-icon-phone">+7 (961) 451 75 51</el-button></a>
            <a href="https://telegram.me/SweetHome_58"><el-button type="primary" class="recolor-blue-button" icon="el-icon-s-promotion">Telegram</el-button></a>
          </div>
        </el-col>
      </el-row>
    </el-row>

    <el-row class="footer-row__info">
      <el-row>{{footerTexterror}} <el-button type="text" class="text-button">свяжитесь с нами.</el-button></el-row>
      <el-row>
        <a
          v-for="(item, index) in footerIcons"
          :href="item.link"
          target="_blank"
          :key="index">
          <img           
            :src="item.img"
            :alt="item.alt"
            height="40"
            >
        </a>
        <span>© 2016-2022<br>SweetHome58</span>
      </el-row>
    </el-row>
  </el-footer>
</template>

<script>

export default {
  name: 'footer-bar',

  data:() => {
    return {
      footerLink_1: [
        { title: 'Квартиры', link: '/'},
        { title: 'О Нас', link: '/about'},
        { title: 'Условия проживания', link: '/conditions'},
        { title: 'Отзывы', link: '/feedbacks'},
        { title: 'Контакты', link: '/contacts'},
      ],
      footerLink_2: [
        { title: '1-комнатные квартиры', filter: '1' },
        { title: '2-х комнатные квартиры', filter: '2'},
        { title: '3-х комнатные квартиры', filter: '3'},
        { title: 'Квартиры рядом с ПГУ', filter: '11'},
        { title: 'Квартиры в центре', filter: '12'}
      ],
      footerIcons: [
        { img: require('@/assets/images/LOGO_LIGHT.png'),  link: '/', alt: 'SweetHome58'},
        { img: require('@/assets/images/icon/vk.png'),     link: 'https://vk.com/penzakvartirka', alt: 'vk.com/penzakvartirka'},
        { img: require('@/assets/images/icon/icons8.png'), link: 'https://icons8.ru/icons/', alt: 'icon8'},
        { img: require('@/assets/images/mk.png'),          link: 'https://monkey-king.ru/', alt: 'Monkey-King.ru'},
      ],
      footerTexterror: 'Мы постоянно работаем над повышением доступности нашего веб-интерфейса, и приветствуем отзывы и обратную связь. Если вы хотите найти жилье, проконсультироваться по вопросам сотрудничества или сообщить об ошибке в работе сайта - пожалуйста, '
    }
  },
}

</script>

<style scoped lang="sass">

.footer
  height: auto
  width: 100%
  display: flex
  flex-wrap: wrap
  padding: 0
  color: #333

  *    
    font-family: Montserrat, Arial, Helvetica, sans-serif

.footer-row__links
  background-color: #f5f5f5
  width: 100%
  justify-content: center
  display: flex
  border-top: solid 1px #ddd
  border-bottom: solid 1px #ddd
  padding: 0 $screen-padding
  
  .el-row
    max-width: 1200px
    width:100%
    display: flex
    padding: 2rem 0

    .button-col

      div
        font:
          weight: bold
          size: .9rem
      
        &:nth-of-type(1)
          margin-bottom: .25rem

      .el-button
        margin: 0 .5rem .5rem 0
        width: 12rem

.footer__link
  width: 100%
  display: flex
  margin-bottom: .8rem
  font:
    weight: bold
    size: .9rem

  &:nth-last-of-type(1)
    margin: 0

  &:hover
    text-decoration: underline
    cursor: pointer
    
.footer-row__info
  width: 100%
  background-color: #fff
  display: flex
  justify-content: center
  color: #333
  font-size: .7rem
  background-image: url(~@/assets/images/footer-bg.png)
  background-repeat: repeat-x
  background-position: bottom
  background-size: 1100px auto
  padding: 0 $screen-padding 200px $screen-padding

  .el-row
    max-width: 1200px
    width:100%
    display: flex
    padding: 2rem 0
    justify-content: center
    text-align: center

    &:nth-of-type(2)
      padding: 0
      
    a, span
      margin: 0 .25rem 
      align-self: center

    img:hover
      cursor: pointer
      transform: translateY(-2px)
      transition-duration: .2s

    .text-button
      font:
        family: Montserrat, Arial, Helvetica, sans-serif
        size: inherit
        weight: normal
      padding: 0
      display: inline-flex

</style>