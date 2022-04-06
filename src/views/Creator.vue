<template>
  <div class="main-contaner editor-contaner">
    
    <Loader v-if="loading" />

    <div v-else class="main-contaner__content">

      <el-row align="middle" class="padding-normal">
        <el-col :span="24" class="editor-main-title"><div class="h1-roboto">{{title}}</div></el-col>      
      </el-row>

      <el-row :gutter="30" style="margin:0;">
        <el-form
          :model="flatData"
          label-position="top"
          label-width="33%"
          status-icon
          :rules="rules"
          ref="flatData"
          class="editor-form"
        >
          <el-col :xs="24" :sm="12" :md="12" :lg="8" class="no-gutter-xs">
            <el-form-item label="Адрес" prop="ADRESS" class="editor-form__item">
              <el-input v-model="flatData.ADRESS"> </el-input>
            </el-form-item>
            
            <el-form-item label="Количество комнат" prop="room" class="editor-form__item">
              <el-radio-group v-model="room" style="background-color: #FFF;">
                <el-radio-button label="1"></el-radio-button>
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="2e"></el-radio-button>
                <el-radio-button label="3"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          
          <el-col :xs="24" :sm="12" :md="12" :lg="8" class="no-gutter-xs">            
            <el-form-item label="Спальные места" prop="sleep" class="editor-form__item">
              <el-input-number v-model="flatData.SLEEP" :min="1" :max="12" style="width: 100%;"></el-input-number>
            </el-form-item>

            <el-form-item label="Диван / кровать" class="editor-form__item">
              <el-input-number v-model="flatData.SOFA" :min="0" :max="5" style="width: 47.5%;"></el-input-number>
              <el-input-number v-model="flatData.BED" :min="0" :max="5" style="width: 47.5%; margin-left: 5%;"></el-input-number>
            </el-form-item>
          </el-col>
          
          <el-col :xs="{span: 24, offset: 0}" :sm="{span: 12, offset: 12}" :md="{span: 12, offset: 12}" :lg="{span: 8, offset: 0}" class="no-gutter-xs creator-3rd-column">
            <el-form-item label="Стоимость суток" prop="price" class="editor-form__item">
              <el-input-number v-model="flatData.PRICE" :step="100" :min="0" :max="10000" style="width: 100%;"></el-input-number>
            </el-form-item>

            <el-form-item class="editor-form__item creator-buttons">
              <el-button-group>
                <el-button type="default" @click="$router.push('/lk')" icon="el-icon-back">Назад</el-button>
                <el-button type="primary" @click="submitForm()" icon="el-icon-check">Сохранить</el-button>
              </el-button-group>
            </el-form-item>
          </el-col>

        </el-form>
      </el-row>

    </div>

  </div>
</template>

<script>

import { useMeta } from 'vue-meta'
import {mapGetters} from 'vuex'
import messages from '@/utils/messages'

export default {
  name: 'editor',

  data: () => {
    return {
      title: 'Добавление квартиры ',
      loading: true,
      room: 1,
      flatData: {
        ADRESS: '',
        PRICE: 0,
        ROOM: 1,
        SOFA: 0,
        BED: 0,
        SLEEP: 1,
        UID: 0
      },      
      rules: {
        ADRESS: [
          { required: true, message: 'Введите адрес', trigger: 'change' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['userID']),

    flatName() {
      return this.randomWord()
    }
  },

  mounted() {

    useMeta({
      title: 'Добавление квартиры',
    })

    this.loading = false
  },

  methods: {

    randomWord() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      var result = ''

      for (let i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },

    async submitForm() {

      this.$refs['flatData'].validate(async (valid) => {
        if(valid) {
          this.flatData.UID = this.userID
          this.flatData.NAME = this.flatName
          this.flatData.ROOM = (this.room === '2e') ? '5' : this.room

          try {
            await this.$store.dispatch('addFlat', this.flatData)

            this.$message({
              message: messages['flat_has_been_created'].message,
              type: messages['flat_has_been_created'].type
            })

            this.$router.push('/editor/' + this.flatName)

          } catch(e) {
            this.$message({
              message: messages['flat_has_been_created_fail'].message,
              type: messages['flat_has_been_created_fail'].type
            })

            this.$router.push('/lk')
          }
        }
      })

    }
  }

}

</script>

<style scoped lang="sass">

  .editor-form
    display: flex
    flex-wrap: wrap
    width: 100%
    align-content: flex-start
    background-color: #f8f8f8
    padding: 5px 5px
    border-radius: 1rem
    box-shadow: inset 0 0 5px #e8e8e8
    border: solid 1px #eee
    align-content: flex-start

  .creator-3rd-column
    display: flex
    flex-wrap: wrap

    div
      width: 100%

  .creator-buttons
    bottom: 0
    align-self: flex-end

    *
      display: flex
      justify-content: flex-end

</style>