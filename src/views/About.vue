<template>
  <div class="main-contaner">
    
    <Loader v-if="loading" />

    <div v-else class="main-contaner__content">
      <el-row class="xs-order-1">
        <h1>{{title}}</h1>
      </el-row>

      <el-row class="text xs-order-2">
        {{text[0]}}
      </el-row>

      <el-row class="text xs-order-5">
        {{text[1]}}
      </el-row>
  
      <el-row class="xs-order-3">
        <h2>{{subTitle}}</h2>
      </el-row>

      <el-row class="xs-order-4 card-contaner">

        <el-col
          v-for="(item, index) in aboutArray"
          :key="index"
          :sm="24"
          :md="12">
          <AboutCard
            :title="item.title"
            :desc="item.desc"
            :icon="item.icon"
          />
        </el-col>

      </el-row>

      <el-row class="text xs-order-6">
        {{text[2]}}
      </el-row>
    </div>

  </div>
</template>

<script>
import AboutCard from '@/components/AboutCard'
import { useMeta } from 'vue-meta'

export default {
  name: 'aboutus',

  data: () => {
    return {
      title: 'О Нас',
      subTitle: 'Почему выбирают нас?',
      loading: true,
      text: [
        'Мы специализируемся на посуточной аренде квартир в Пензе командированным, деловым туристам и другим гостям нашего города. Мы дорожим своей репутацией и поэтому в наших квартирах всегда уютно, чисто и тихо. Снять квартиру в Пензе на сутки у нас дешевле, чем останавливаться в гостиницах и отелях. Мы предлагаем для посуточной аренды просторные, современные 1-,2-,3-х комнатные квартиры, расположенные в новых элитных домах, в центре города Пенза.',
        'В шаговой доступности находится вся необходимая инфраструктура: супермаркеты, торгово-развлекательные и офисные центры, кафе и рестораны, остановки общественного транспорта. На сайте представлена подробная информация о всех наших квартирах: качественные фото интерьера, описание инфраструктуры, интерактивная карта с отметкой месторасположения. Также рекомендуем ознакомиться с правилами бронирования и проживания.',
        'Аренда квартиры посуточно в Пензе является весьма удобным вариантом не только для иногородних туристов, но и для командированных, которые могут получить все отчётные документы.'
      ],
      aboutArray: [
        { title: 'В квартирах чисто',         desc: 'генеральная уборка после каждого гостя',                         icon: require('@/assets/images/icon/cl.png') },
        { title: 'Удобное месторасположение', desc: 'квартиры в самых нужных районах',                                icon: require('@/assets/images/icon/mesto.png') },
        { title: 'Оптимальная цена',          desc: 'полноценная квартира дешевле, чем номер в отеле',                icon: require('@/assets/images/icon/cash.png') },
        { title: 'Евроремонт',                desc: 'красивые и уютные квартиры',                                     icon: require('@/assets/images/icon/er.png') },
        { title: 'Wi-Fi',                     desc: 'безлимитный Wi-Fi интернет',                                     icon: require('@/assets/images/icon/wifi.png') },
        { title: 'Техническое оснащение',     desc: 'в квартире есть вся необходимая бытовая техника',                icon: require('@/assets/images/icon/hol.png') },
        { title: 'Только новостройки',        desc: 'новые квартиры в новых домах',                                   icon: require('@/assets/images/icon/nov.png') },
        { title: 'Удобная оплата',            desc: 'наличный расчет или перевод на банковскую карту',                icon: require('@/assets/images/icon/card.png') },
        { title: 'Отчётные документы',        desc: 'договора, чеки, квитанции',                                      icon: require('@/assets/images/icon/docs.png') },
        { title: 'Укомплектованная кухня',    desc: 'есть вся необходимая посуда и кухонные принадлежности',          icon: require('@/assets/images/icon/kit.png') },
        { title: 'Шампуни и мыло',            desc: 'предметы бытовой химии и средства гигиены',                      icon: require('@/assets/images/icon/bh.png') },
        { title: 'Чистое белье',              desc: 'комплекты чистого белья и полотенца в необходимом количестве',   icon: require('@/assets/images/icon/pb.png') },
        { title: 'NO SMOKING!',               desc: 'у нас в квартирах не курят',                                     icon: require('@/assets/images/icon/smoking.png') },
        { title: 'Все по-чесному',            desc: 'все фотографии квартир на сайте соответствуют действительности', icon: require('@/assets/images/icon/photo.png') },
      ]
    }
  },

  mounted() {    

    useMeta({
      title: 'О нашей компании',
      description: 'Почему выбирают нас? Наши достоинства и преимущества. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
      og: {
        description: 'Почему выбирают нас? Наши достоинства и преимущества. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
        image: require('@/assets/images/og-image.jpg'),
        url: 'sweethome58.ru/about',
        title: 'О нашей компании | Посуточная аренда квартир'
      }
    })

    this.loading = false
  },

  components: {
    AboutCard
  }
}
</script>



<style scoped lang="sass">

.card-contaner
  background-color: #fafafa
  padding: 5px
  border-radius: 5px
  margin-top: 1rem
  box-shadow: inset 0 0 5px #e8e8e8
  border: solid 1px #eee

  .el-col
    display: flex

</style>