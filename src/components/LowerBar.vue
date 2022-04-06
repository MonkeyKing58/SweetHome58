<template>
  <nav class="lower-bar">
    <router-link
      v-for="(item, index) in lowerBarItems"
      :key="index"
      :to="item.link"
      class="lower-bar__item"
      >
        <img :src="item.img">
        <div>{{item.title}}</div>
      </router-link>
  </nav>
</template>

<script>

export default ({
  name: 'lower-bar',
  data:() => {
    return {
      lowerBarItems: [
        { img: require('@/assets/images/icon/lowerbar-flat.png'), title: 'Квартиры', link: '/' },
        { img: require('@/assets/images/icon/lowerbar-cond.png'), title: 'Условия', link: '/conditions' },
        { img: require('@/assets/images/icon/lowerbar-feedbacks.png'), title: 'Отзывы', link: '/feedbacks' },
        { img: require('@/assets/images/icon/lowerbar-about.png'), title: 'О Нас', link: '/about' },
        { img: require('@/assets/images/icon/lowerbar-contact.png'), title: 'Контакты', link: '/contacts' }
      ]
    }
  }
})

</script>


<style scoped lang="sass">

.lower-bar
  width: 100%
  height: 3.5rem
  position: fixed
  left: 0
  bottom: 0
  background-color: #fff
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)
  padding: 0 2vw
  display: flex
  align-items: center
  z-index: $z-index-lower_bar

  &__item
    height: 3rem
    width: 100%
    flex-wrap: wrap
    display: flex
    justify-content: center
    text-align: center
    filter: grayscale(1)
    opacity: .75

    *
      display: flex

    img
      height: 1.5rem
      margin: .25rem 0

    div
      justify-content: center
      width: 100%
      color: $color-theme-blue
      font:
        size: .7rem
    
.router-link-active
  opacity: 1
  filter: none

</style>