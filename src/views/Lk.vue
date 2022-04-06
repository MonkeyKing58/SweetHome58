<template>
  <div class="lk-contaner">
    
    <Loader v-if="loading" />

    <div v-else class="main-contaner__content">

      <el-row align="middle" class="padding-normal">
        <el-col :xs="24" :sm="12"><h1>{{title}}</h1></el-col>
        <el-col :xs="24" :sm="12" class="lk-buttons-xs" style="justify-content: flex-end; display: flex;">
          <el-button-group>
            <el-button type="primary" @click="$router.push('/flatlist_for_work')" class="recolor-blue-button" icon="el-icon-s-custom">Список</el-button>
            <el-button type="default" @click="$router.push('/creator')" class="recolor-blue-border" icon="el-icon-plus">Добавить</el-button>
            <el-button type="default" @click="logout()" class="recolor-blue-border" icon="el-icon-s-custom">Выйти</el-button>
          </el-button-group>
        </el-col>        
      </el-row>

      <el-row v-if="userFlats.length" class="padding-normal-exept-xs">
        <el-col
          :xs="24" :sm="12" :md="12" :lg="8" :xl="6"
          v-for="(item, index) in userFlats"
          :key="index"
          class="lk__flat-item"
        >
          <flat-card :flat="item" :button="true"/>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import messages from '@/utils/messages'
import {mapGetters} from 'vuex'
import FlatCard from '@/components/FlatCard'

export default {
  name: 'lk',

  data: () => {
    return {
      title: 'Личный кабинет',
      loading: true
    }
  },

  computed: {
    
    ...mapGetters(['flats', 'userID']),

    userFlats() {
      let arr = this.flats

      arr = arr.filter(i => {
        return (this.userID === i.OWNER_ID)
      })
      
      return arr
    }
  },

  mounted() {    

    useMeta({
      title: 'Личный кабинет',
    })

    this.loading = false
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/')

      this.$message({
        message: messages['logout'].message,
        type: messages['logout'].type
      })
    }
  },

  components: {
    FlatCard
  }
}

</script>

<style scoped lang="sass">

.padding-normal
  padding: 0 $screen-padding

.padding-normal-exept-xs
  padding: 0 $screen-padding

.lk-contaner
  width: 100%
  display: flex
  justify-content: center
  align-items: flex-start

.lk__flat-item
  padding: 2px

  *
    width: 100%

</style>