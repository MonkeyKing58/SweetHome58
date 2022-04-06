<template>
  <el-header class="header">    
    <router-link to="/" class="logo-wrap" tabindex="-1">
      <img src="~@/assets/images/logo-header.png" tabindex="-1" alt="sweethome58-logo">
    </router-link>

    <router-link
      class="menu-item hidden-xs-only"
      v-for="(menuItem,index) in menuItems"
      :key="index"
      :to="menuItem.link"
      tabindex="-1"
    >{{menuItem.title}}</router-link>

    <a href="tel:+79613517551" class="call hidden-sm-and-up"></a>

  </el-header>
</template>

<script>

export default ({
  name: 'header-nav',
  data:() => {
    return {
      menuItems: [
        { title: 'КВАРТИРЫ', link: '/' },
        { title: 'УСЛОВИЯ', link: '/conditions' },
        { title: 'ОТЗЫВЫ', link: '/feedbacks' },
        { title: 'О НАС', link: '/about' },
        { title: 'КОНТАКТЫ', link: '/contacts' }
      ]
    }
  }
})

</script>


<style scoped lang="sass">

.header
  background: linear-gradient(to right,$color-theme-blue 30%, $color-theme-orange)
  height: 5.5rem
  z-index: $z-index-header
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)
  display: flex
  padding: .5rem 3.5rem
  animation-name: bg-header
  animation-duration: 5s
  animation-timing-function: ease-in-out
  animation-iteration-count: infinite
  width: 100%
  max-width: 100vw

  *    
    font-family: Montserrat, Arial, Helvetica, sans-serif

  .call
    display: flex
    width: 2rem
    min-width: 2rem
    height: 3.5rem
    background-image: url(~@/assets/images/icon/phone-white.png)
    background-repeat: no-repeat
    background-size: 150%
    background-position: center

  .logo-wrap
    border-right: solid 2px #fff
    padding: .5rem 3vw .5rem 0
    margin-right: 3vw

    img
      height: 100%

  .menu-item
    display: flex
    align-items: center
    color: #fff
    font-size: 1.5vw
    font-weight: bold
    transition-duration: .2s
    padding: 1rem 1.5vw

    &:hover
      cursor: pointer
      background-color: rgba(255, 255, 255, .15)

@keyframes bg-header
  from
    background-size:150%
    background-position:0
  50%	
    background-size:100%
    background-position:0
  to
    background-size:150%
    background-position:0

</style>