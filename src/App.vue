<template>

  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | SweetHome58 - Посуточная аренда квартир` : `SweetHome58 | Посуточная аренда квартир` }}</template>
  </metainfo>
    
  <Loader v-if="loading" />

  <component v-else :is="layout">
    <router-view/>
  </component>
  
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue'
import MapLayout from '@/layouts/Map.vue'
import WorkLayout from '@/layouts/Work.vue'
import EmptyLayout from '@/layouts/Empty.vue'
import { useMeta } from 'vue-meta'
import Loader from '@/components/Loader'

export default {
  name: 'App',
  
  data: () => {
    return {
      loading: true
    }
  },

  async mounted() {
    useMeta({
      title: 'Квартиры в Пензе',
      description: 'Аренда квартир в г.Пенза по суткам. Чистые и уютные квартиры в новых домах для гостей города Пенза и для тех, кто в командировке. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
      og: {
        description: 'Аренда квартир в г.Пенза по суткам. Чистые и уютные квартиры в новых домах для гостей города Пенза и для тех, кто в командировке. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
        image: require('@/assets/images/og-image.jpg'),
        url: 'sweethome58.ru',
        title: 'Квартиры в Пензе | SweetHome58 - Посуточная аренда квартир'
      }
    })

    if(!Object.keys(this.$store.getters.flats).length) {
      await this.$store.dispatch('fetchFlats')
    }

    this.loading = false
    
  },

  computed: {
    layout() {
      return this.$route.meta.layout + '-layout'
    }
  },

  components: {
    DefaultLayout, MapLayout, WorkLayout, EmptyLayout,
    Loader
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