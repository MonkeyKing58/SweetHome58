<template>
  <div class="main-contaner editor-contaner">
    
    <Loader v-if="loading" />

    <div v-else class="main-contaner__content">

      <el-row align="middle" class="padding-normal">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" class="editor-main-title"><div class="h1-roboto">{{title}}</div></el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" style="justify-content: flex-end; display: flex;">

          <el-button-group class="editor-main-buttons">
            <el-button type="default" @click="$router.push('/lk')" class="recolor-blue-border" icon="el-icon-back">Назад</el-button>
            <el-button type="primary" @click="submitForm()" class="recolor-blue-button" icon="el-icon-check">Сохранить</el-button>
          </el-button-group>
          <el-button type="danger" @click="dialogVisible = true" class="editor-main-buttons__delete" icon="el-icon-delete"></el-button>
         

        </el-col>        
      </el-row>

      <el-row :gutter="30" style="margin:0;">
        <el-form
          :model="editData"
          label-position="top"
          label-width="33%"
          status-icon
          ref="editData"
          class="editor-form"
        >
          <el-col :xs="24" :sm="12" :md="12" :lg="8" class="no-gutter-xs">

            <el-form-item label="Адрес" prop="adress" class="editor-form__item">
              <el-input v-model="editData.ADRESS"> </el-input>
            </el-form-item>

            <el-form-item label="Стоимость суток" prop="price" class="editor-form__item">
               <el-input-number v-model="price" :step="100" :min="0" :max="10000" style="width: 100%;"></el-input-number>
            </el-form-item>

            <el-form-item label="Количество комнат" prop="room" class="editor-form__item">
              <el-radio-group v-model="room" style="background-color: #FFF;">
                <el-radio-button label="1"></el-radio-button>
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="2e"></el-radio-button>
                <el-radio-button label="3"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Спальные места / Количество гостей" prop="sleep" class="editor-form__item">
              <el-input-number v-model="sleep" :min="1" :max="12" style="width: 47.5%;"></el-input-number>
              <el-input-number v-model="men" :min="1" :max="12" style="width: 47.5%; margin-left: 5%;"></el-input-number>
              <el-input v-model="editData.SLEEP" style="margin-top: .5rem;"> </el-input>
            </el-form-item>

            <el-form-item label="Диван / кровать" class="editor-form__item">
              <el-input-number v-model="sofa" :min="0" :max="5" style="width: 47.5%;"></el-input-number>
              <el-input-number v-model="bed" :min="0" :max="5" style="width: 47.5%; margin-left: 5%;"></el-input-number>
            </el-form-item>

          </el-col>

<!-- ------------2--------------- -->

          <el-col :xs="24" :sm="12" :md="12" :lg="8" class="no-gutter-xs">

            <el-form-item label="Wi-Fi" class="editor-form__item">
              <el-input type="textarea" resize="none" rows="24" placeholder="Wi-Fi" v-model="editData.WIFI"> </el-input>
            </el-form-item>

          </el-col>

<!-- ------------3--------------- -->

          <el-col :xs="24" :sm="24" :md="12" :lg="8" class="no-gutter-xs">

            <el-form-item label="Координаты" prop="coord" class="editor-form__item">
              <el-input v-model="editData.COORD"> </el-input>
            </el-form-item>

            <el-form-item label="SHORT_NAME" prop="short_name" class="editor-form__item">
              <el-input v-model="editData.SHORT_NAME"> </el-input>
            </el-form-item>

            <el-form-item label="FISHKA" prop="fishka" class="editor-form__item">
              <el-input v-model="editData.FISHKA"> </el-input>
            </el-form-item>

            <el-form-item label="Рядом" class="editor-form__item">
              <el-switch active-text="ПГУ" v-model="pgu" style="margin-right: 1.5rem;"></el-switch>
              <el-switch active-text="Центр" v-model="cnt" style="margin-right: 1.5rem;"></el-switch>
              <el-switch active-text="Зоопарк" v-model="zoo"></el-switch>
            </el-form-item>

            <el-form-item label="Удобства" class="editor-form__item">
              <el-switch active-text="Кондиционер" v-model="cond" style="margin-right: 1.5rem;"></el-switch>
              <el-switch active-text="Бойлер" v-model="boler" style="margin-right: 1.5rem;"></el-switch>
              <el-switch active-text="Огороженная территория" v-model="zabor"></el-switch>
            </el-form-item>

          </el-col>

<!-- ------------4--------------- -->

          <el-col :xs="24" :sm="24" :md="12" :lg="12" class="no-gutter-xs">

            <el-form-item label="Рядом" class="editor-form__item" >              
              <el-row v-for="(item, index) in nearArr" :key="index" style="margin-bottom: .5rem;">
                <div style="width:2%; text-align: right;">{{index+1}}</div>
                <el-input v-model="item.place" style="width: 47.5%; margin-left: 1.5%;"> </el-input>
                <el-select v-model="item.time" placeholder="Выберите" style="width: 47.5%; margin-left: 1.5%;">
                  <el-option
                    v-for="option in options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    :disabled="(nearArr[index].place === null) || (nearArr[index].place === '')">
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item>

          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="12" class="no-gutter-xs">

            <el-form-item label="Инфо" class="editor-form__item">
              <el-input type="textarea" resize="none" rows="22" placeholder="about" v-model="editData.ABOUT"> </el-input>
            </el-form-item>

          </el-col>

          <el-col :span="24" class="no-gutter-xs">
            
            <el-form-item label="Фото" class="editor-form__item">

              <el-row class="editor-photo" v-if="photos[0] !== ''">
                <el-col
                  v-for="(item, index) in photos"
                  :key="index"
                  :xs="12" :sm="8" :md="6" :lg="6"
                  class="editor-photo__item editor-border-for-main-photo"
                >
                  <img :src="`/images/flats/${editData.OWNER_ID}/${editData.NAME}/${item}`" alt="item">
                  <el-button-group class="editor-photo__item__buttons">
                    <el-button @click="shiftPhoto(index, 'left')" :disabled="!index" type="primary" plain icon="el-icon-back"></el-button>
                    <el-button @click="deletePhoto(index)" type="primary" plain icon="el-icon-delete"></el-button>
                    <el-button @click="shiftPhoto(index, 'right')" :disabled="index === photos.length-1" type="primary" plain icon="el-icon-right"></el-button>
                  </el-button-group>
                </el-col>
              </el-row>

            </el-form-item>

          </el-col>

          <el-col :md="24" :lg="24" class="no-gutter-xs">
            
            <el-form-item label="Добавить фото" class="editor-form__item">

              <el-row class="editor-photo">
                <el-upload
                  ref="upload"
                  class="editor-photo__adder"
                  accept="image/jpeg,image/png"
                  action="https://sweethome58.ru"
                  :before-upload="beforeUpload"
                  :on-success="successUpload"
                  :on-remove="removeFile"
                  multiple
                  :limit="20"
                >
                  <el-button type="primary">Выберите файл</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png файлы не более 1Мб
                    </div>
                  </template>
                </el-upload>                
                <el-button
                  @click="uploadPhotos()"
                  :loading="uploadButton.load"
                  :disabled="uploadButton.disabled"
                  style="margin: 1rem .5rem 0 .5rem;"
                  type="success"
                >Загрузить</el-button>
                
              </el-row>

            </el-form-item>

          </el-col>

          <el-col :span="24" class="no-gutter-xs">
            <el-button-group style="display: flex; justify-content: flex-end;" class="editor-main-buttons">
              <el-button type="default" @click="$router.push('/lk')" class="recolor-blue-border" icon="el-icon-back">Назад</el-button>
              <el-button type="primary" @click="submitForm()" class="recolor-blue-button" icon="el-icon-check">Сохранить</el-button>
            </el-button-group>
          </el-col>

        </el-form>
      </el-row>

    </div>

    <el-dialog
      title="Подтвердите удаление"
      v-model="dialogVisible"
      top="35vh"
      width="35%"
      custom-class="dialog">
      <span>Удалить квартиру {{title}}?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" class="recolor-blue-border" icon="el-icon-close">Отмена</el-button>
          <el-button type="primary" class="recolor-blue-button"  @click="deleteFlat()" icon="el-icon-delete">Удалить</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import messages from '@/utils/messages'
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'editor',

  data: () => {
    return {
      title: 'г.Пенза, ул.',
      uploadPhotosArray: [],
      loading: true,
      editData: {},
      uploadButton: {
        load: false,
        disabled: true
      },
      dialogVisible: false,
      price: 0,
      sleep: 0,
      men: 1,
      room: 1,
      bed: 1,
      sofa: 1,
      pgu: 0,
      zoo: 0,
      cnt: 0,
      boler: 0,
      cond: 0,
      zabor: 0,
      photos: [],
      deletedPhotos: [],
      nearArr: [],
      options: [
        { label: 'прямо в доме', value: 'прямо в доме'},
        { label: '3 мин.', value: '3 мин.'},
        { label: '5 мин.', value: '5 мин.'},
        { label: '10 мин.', value: '10 мин.'},
        { label: '15 мин.', value: '15 мин.'},
        { label: '5 мин. на авто', value: '5мин. на авто'},
        { label: '10 мин. на авто', value: '10мин. на авто'}
      ]
    }
  },

  computed: {    
    ...mapGetters(['flats'])
  },

  mounted() {   
    
    const {id} = this.$route.params 
    
    this.editData = this.flats.filter(i => i.NAME === id)[0]
    this.title += this.editData.ADRESS + ' ( ' + this.editData.SHORT_NAME + ' )'

    this.price = +this.editData.PRICE
    this.sleep = +this.editData.KOL_SLEEP
    this.men = +this.editData.MEN
    this.bed = +this.editData.BED
    this.sofa = +this.editData.SOFA

    this.pgu = (this.editData.pgu === '1') ? true : false
    this.cnt = (this.editData.cnt === '1') ? true : false
    this.zoo = (this.editData.zoo === '1') ? true : false

    this.boler = (this.editData.BOLER === '1') ? true : false
    this.cond = (this.editData.COND === '1') ? true : false
    this.zabor = (this.editData.ZABOR === '1') ? true : false

    this.nearArr.push({ place: this.editData.NEAR_1,  time: this.editData.NEAR_1_TIME })
    this.nearArr.push({ place: this.editData.NEAR_2,  time: this.editData.NEAR_2_TIME })
    this.nearArr.push({ place: this.editData.NEAR_3,  time: this.editData.NEAR_3_TIME })
    this.nearArr.push({ place: this.editData.NEAR_4,  time: this.editData.NEAR_4_TIME })
    this.nearArr.push({ place: this.editData.NEAR_5,  time: this.editData.NEAR_5_TIME })
    this.nearArr.push({ place: this.editData.NEAR_6,  time: this.editData.NEAR_6_TIME })
    this.nearArr.push({ place: this.editData.NEAR_7,  time: this.editData.NEAR_7_TIME })
    this.nearArr.push({ place: this.editData.NEAR_8,  time: this.editData.NEAR_8_TIME })
    this.nearArr.push({ place: this.editData.NEAR_9,  time: this.editData.NEAR_9_TIME })
    this.nearArr.push({ place: this.editData.NEAR_10, time: this.editData.NEAR_10_TIME })

    this.photos = (this.editData.PHOTOS) ? this.editData.PHOTOS.split(',') : []

    switch(this.editData.KOL_ROOM) {
      case '1': {
        this.room = '1'
        break
      }
      case '2': {
        this.room = '2'
        break
      }
      case '3': {
        this.room = '3'
        break
      }
      case '5': {
        this.room = '2e'
        break
      }
    }

    useMeta({
      title: 'Редактирование квартиры',
    })

    this.loading = false
  },

  methods: {

    async deleteFlat() {
      try {
        const deleteData = {
          flatName: this.editData.NAME,
          flatOwner: this.editData.OWNER_ID
        }
        await this.$store.dispatch('removeFlat', deleteData )

        this.$message({
          message: messages['flat_has_been_deleted'].message,
          type: messages['flat_has_been_deleted'].type
        })

        this.$router.push('/lk')

      } catch(e) {
        this.$message({
          message: 'Ошибка удаления',
          type: 'warning'
        })

        // this.$router.push('/lk')
      }

      this.dialogVisible = false
    },

    async uploadPhotos() {

      this.uploadButton.load = true

      let formData = new FormData()

      for( let i = 0; i < this.uploadPhotosArray.length; i++) {
        formData.append('file-'+i, this.uploadPhotosArray[i])
      }

      formData.append('flatname', this.editData.NAME)
      formData.append('ownerid', this.editData.OWNER_ID)

      const SAVED_THIS = this

      axios.post( 'https://sweethome58.ru/api/select-files.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(response){
        console.log(response)
        SAVED_THIS.uploadButton.load = false
        SAVED_THIS.uploadButton.disabled = true
        SAVED_THIS.$refs.upload.clearFiles()
        SAVED_THIS.addPhotosToFlat()
      })
      .catch(function(e){
        SAVED_THIS.$message.error('Не удалось загрузить фото(');
        console.log(e)
        SAVED_THIS.uploadButton.load = false
      })

    },

    beforeUpload(file) {
      const isJPG = ((file.type === 'image/jpeg') || (file.type === 'image/png'));
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('Только png или jpeg');
      }
      if (!isLt2M) {
        this.$message.error('Фото не может превышать 1Mб');
      }
      return isJPG && isLt2M;
    },

    successUpload(response, file, fileList) {
      if (response) console.log(1)
      
      this.uploadPhotosArray.push(file.raw)

      this.uploadButton.disabled = (fileList.length) ? false : true
    },

    removeFile(file, fileList) {

      const index = this.uploadPhotosArray.findIndex(i => i.uid == file.uid)

      this.uploadPhotosArray.splice(index, 1)

      this.uploadButton.disabled = (fileList.length) ? false : true
    },

    async addPhotosToFlat() {
      const arr = this.uploadPhotosArray

      arr.forEach(i => {
        this.photos.push(i.name)
      })
      
      this.editData.PHOTOS = this.photos.join()

      try {
        await this.$store.dispatch('editFlat', this.editData)
      } catch(e) {
        console.log(e)
      }

      this.$message.success(this.uploadPhotosArray.length + ' фото загружено')
      
      this.uploadPhotosArray = []
    },

    async submitForm() {

      this.editData.PRICE = this.price
      this.editData.KOL_SLEEP = this.sleep
      this.editData.MEN = this.men
      this.editData.BED = this.bed
      this.editData.SOFA = this.sofa

      this.editData.pgu = (this.pgu) ? '1' : '0'
      this.editData.cnt = (this.cnt) ? '1' : '0'
      this.editData.zoo = (this.zoo) ? '1' : '0'

      this.editData.BOLER = (this.boler) ? '1' : '0'
      this.editData.COND = (this.cond) ? '1' : '0'
      this.editData.ZABOR = (this.zabor) ? '1' : '0'

      this.editData.NEAR_1 = this.nearArr[0].place
      this.editData.NEAR_2 = this.nearArr[1].place
      this.editData.NEAR_3 = this.nearArr[2].place
      this.editData.NEAR_4 = this.nearArr[3].place
      this.editData.NEAR_5 = this.nearArr[4].place
      this.editData.NEAR_6 = this.nearArr[5].place
      this.editData.NEAR_7 = this.nearArr[6].place
      this.editData.NEAR_8 = this.nearArr[7].place
      this.editData.NEAR_9 = this.nearArr[8].place
      this.editData.NEAR_10 = this.nearArr[9].place

      this.editData.NEAR_1_TIME = this.nearArr[0].time
      this.editData.NEAR_2_TIME = this.nearArr[1].time
      this.editData.NEAR_3_TIME = this.nearArr[2].time
      this.editData.NEAR_4_TIME = this.nearArr[3].time
      this.editData.NEAR_5_TIME = this.nearArr[4].time
      this.editData.NEAR_6_TIME = this.nearArr[5].time
      this.editData.NEAR_7_TIME = this.nearArr[6].time
      this.editData.NEAR_8_TIME = this.nearArr[7].time
      this.editData.NEAR_9_TIME = this.nearArr[8].time
      this.editData.NEAR_10_TIME = this.nearArr[9].time

      this.editData.KOL_ROOM = (this.room === '2e') ? '5' : this.room

      this.editData.PHOTOS = this.photos.join()
      this.editData.KOL_PHOTO = this.photos.length

      this.editData.DELETED_PHOTOS = this.deletedPhotos
      this.deletedPhotos = []

      try {
        await this.$store.dispatch('editFlat', this.editData)
      } catch(e) {
        console.log(e)
      }

      this.$message({
        message: messages['flat_has_been_updated'].message,
        type: messages['flat_has_been_updated'].type
      })

    },

    deletePhoto(i) {
      this.deletedPhotos.push(this.photos[i])
      this.photos.splice(i, 1)
    },

    shiftPhoto(index, direction) {

      let saveEl = null

      if ((direction === 'left') && (index)) {
        saveEl = this.photos[index]
        this.photos[index] = this.photos[index-1]
        this.photos[index-1] = saveEl
      }

      if ((direction === 'right') && (index+1 < this.photos.length)) {        
        saveEl = this.photos[index]
        this.photos[index] = this.photos[index+1]
        this.photos[index+1] = saveEl
      }
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

  .editor-photo
    background-color: #fff
    border-radius: 4px
    border: solid 1px #e8e8e8
    padding: .5rem

    &__item
      overflow: hidden
      width: 100%
      padding: .25rem
      display: flex
      flex-wrap: wrap
      align-content: flex-start

      img
        width: 100%
        display: flex
        border-radius: 4px 4px 0 0

    &__item__buttons
      width: 100%
      display: flex

      *
        width: 100%

      button
        &:first-child
          border-radius: 0 0 0 4px
        &:last-child
          border-radius: 0 0 4px 0

    &__item-add
      width: 100%
      height: 100%

    .editor-border-for-main-photo  
      &:nth-of-type(1)
        background-color: lighten(#E6A23C, 25%)
        border-radius: 6px

    &__adder
      width: 100%
      padding: .5rem
  
  .editor-main-buttons
    margin-bottom: 1rem

    &__delete
      margin-left: 0.5rem
      height: 100%
</style>