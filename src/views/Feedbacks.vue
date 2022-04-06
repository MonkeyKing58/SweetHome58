<template>
  <div class="main-contaner">
    
    <Loader v-if="loading" />

    <div v-else class="main-contaner__content">

      <el-row><el-col><h1>{{title}}</h1></el-col></el-row>

      <el-row v-if="!showForm">
        <el-col>
         <el-button @click="showForm = !showForm">Добавить отзыв <i class="el-icon-plus"></i></el-button>
        </el-col>
      </el-row>

      <el-row v-if="showForm">
        <el-col :sm="24" :md="12">
          <feedback-form 
            @closeform="showForm = !showForm"/>
        </el-col>
      </el-row>

      <div class="feedback-contaner">
        <feedback-item
          v-for="(item, index) in feedBacks"
          :key="index"
          :order="index % 2 * 2 + 1"
          :wrapperPhoto="wrapperPhoto(item.FLAT_LINK, item.OWNER_ID)"
          :feedback="item"
        />
      </div>

    </div>

  </div>
</template>

<script>
import FeedbackItem from '@/components/FeedbackItem'
import FeedbackForm from '@/components/FeedbackForm'
import {mapGetters} from 'vuex'
import { useMeta } from 'vue-meta'

export default {
  name: 'feedbacks',

  data: () => {
    return {
      title: 'Отзывы клиентов',
      loading: true,
      showForm: false
    }
  },

  computed: {    
    ...mapGetters(['feedBacks', 'flats']),
  },

  methods: {
    wrapperPhoto(flatName, ownerId) {

      if(flatName && ownerId) {
        const flatInfo = this.flats.find(i => i.NAME === flatName)

        if(flatInfo && flatInfo.PHOTOS) {
          const photosList = flatInfo.PHOTOS.split(',')
          return ownerId + '/' + flatName + '/' + photosList[0]
        }
      }

      return false
    }
  },

  async mounted() {

    useMeta({
      title: 'Отзывы наших клиентов',
      description: 'Отзывы довольных клиентов о нашей работе. Оставьте свой отзыв о наших квартирах. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
      og: {
        description: 'Отзывы довольных клиентов о нашей работе. Оставьте свой отзыв о наших квартирах. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
        image: require('@/assets/images/og-image.jpg'),
        url: 'sweethome58.ru/feedbacks',
        title: 'Квартиры в Пензе | SweetHome58 - Посуточная аренда квартир'
      }
    })

    if(!Object.keys(this.$store.getters.feedBacks).length) {
      await this.$store.dispatch('fetchFeedbacks')
    }
    
    this.loading = false
  },

  components: {
    FeedbackItem, FeedbackForm
  }
}
</script>


<style scoped lang="sass">

.feedback-contaner
  display: flex
  flex-wrap: wrap
  width: 100%
  align-content: flex-start
  background-color: #f8f8f8
  padding: 5px 10px
  border-radius: 5px
  box-shadow: inset 0 0 5px #e8e8e8
  border: solid 1px #eee
  margin-top: 1rem

</style>