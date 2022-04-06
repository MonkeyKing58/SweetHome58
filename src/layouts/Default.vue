<template>
  <div class="main-wrapper">
    <Header />
      <router-view v-slot="{ Component }">
        <transition name="ani">
          <component :is="Component" />
        </transition>
      </router-view>
    <Footer />

    <LowerBar class="hidden-sm-and-up" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LowerBar from '@/components/LowerBar'

export default {
  name: 'default-layout',

  data:() => {
    return {
      loading: true
    }
  },

  components: {
    Header, Footer, LowerBar
  }
}
</script>

<style lang="sass" scoped>

.main-wrapper
  min-height: 100vh
  display: flex
  flex-direction: column
  flex-wrap: wrap 

.ani-enter-active
  animation: ani-in 1s

.ani-leave-active
  animation: ani-out .15s

@keyframes ani-in
  0%
    // transform: translateX(-100vw)
    opacity: 0
  100%
    // transform: translateX(0)
    opacity: 1

@keyframes ani-out
  0%
    // transform: translateX(0)
    opacity: 1
  100%
    // transform: translateX(100vw)
    opacity: 0

</style>