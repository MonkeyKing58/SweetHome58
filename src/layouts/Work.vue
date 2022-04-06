<template>
  <div class="main-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="ani">
          <component :is="Component" />
        </transition>
      </router-view>
  </div>
</template>

<script>

export default {
  name: 'work-layout',

  data:() => {
    return {
      loading: true
    }
  },

  components: {
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
  animation: ani-out .25s

@keyframes ani-in
  0%
    transform: translateX(-100vw)
    opacity: 0
  100%
    transform: translateX(0)
    opacity: 1

@keyframes ani-out
  0%
    transform: translateX(0)
    opacity: 1
  100%
    transform: translateX(100vw)
    opacity: 0

</style>