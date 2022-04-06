<template>
  <div class="main-contaner">
    
    <Loader v-if="loading" />

    <div v-else class="main-contaner__content">
      <el-row>
        <el-col :sm="24" :md="12" class="xs-order-2 sm-order-2">
          <div class="contacts__img"></div>
          <div class="contacts__adress">
            <div></div>
            <div>г.Пенза, ул.Плеханова 14</div>
            <div></div>
          </div>
        </el-col>

        <el-col class="contacts-links xs-order-1 sm-order-1" :sm="24" :md="12">
          <el-row>
            <el-col>
              <h1>{{title}}</h1>
            </el-col>

            <el-col
              v-for="(item,index) in contactArray"
              :key="index"
            >
              <a :href="item.href" class="contacts-item">
                <div class="contacts-item__icon" :style="{'background-image':'url('+item.icon+')'}"></div>
                <div class="contacts-item__body">
                  <div class="contacts-item__title">{{item.title}}</div>
                  <div class="contacts-item__desc">{{item.desc}}</div>
                </div>
              </a>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { useMeta } from 'vue-meta'

export default {
  name: 'contacts',

  data: () => {
    return {
      title: 'Контакты',
      loading: true,
      contactArray: [
        { title: 'Телефон', desc: '+7(961) 351 75 51', icon: require('@/assets/images/icon/phone-pll.png'), href: 'tel:+79613517551' },
        { title: 'Telegram', desc: 'SweetHome_58', icon: require('@/assets/images/icon/teleg.png'), href: 'https://telegram.me/SweetHome_58' },
        { title: 'Viber', desc: '+7(961) 351 75 51', icon: require('@/assets/images/icon/viber.png'), href: 'viber://chat?number=+79613517551' },
        { title: 'Email', desc: 'info@sweethome58.ru', icon: require('@/assets/images/icon/mail.png'), href: 'mailto:info@sweethome58.ru' }
      ]
    }
  },

  mounted() {

    useMeta({
      title: 'Контактная информация SweetHome58',
      description: 'Контактный телефон, почта, Viber, WhatsApp, Telegtam. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
      og: {
        description: 'Контактный телефон, почта, Viber, WhatsApp, Telegtam. Снять квартиру в Пензе ☎ +7 (961) 351-75-51',
        image: require('@/assets/images/og-image.jpg'),
        url: 'sweethome58.ru/contacts',
        title: 'Контактная информация SweetHome58 | Посуточная аренда квартир'
      }
    })

    this.loading = false
  },

  components: {
  }
}
</script>


<style scoped lang="sass">

.contacts-links
  padding-left: 2rem

.contacts__img
  display: flex
  height: 21rem
  background-image: url(~@/assets/images/gummy-city.png)
  background-repeat: no-repeat
  background-position: center
  background-size: contain

.contacts__adress
  display: flex
  height: 5rem
  align-content: center
  justify-content: center

  div:nth-of-type(1)
    width: 3rem
    background-image: url(~@/assets/images/icon/geo.png)
    background-repeat: no-repeat
    background-position: right center
    background-size: 50%

  div:nth-of-type(2)
    align-items: center
    display: flex
    color: #000
    font:
      family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif
      weight: bold
      size: 1.1rem

  div:nth-of-type(3)
    width: 1.5rem

.contacts-item
  display: flex
  width: 100%
  margin-bottom: .5rem

  div
    display: flex
    width: 100%

  &__icon
    width: 5rem!important
    min-width: 5rem
    height: 5rem
    background-size: 70%
    background-position: left center
    background-repeat: no-repeat

  &__body
    flex-wrap: wrap
    align-content: center

  &__title
    color: #777
    font-size: .9rem

  &__desc
    color: $color-theme-blue-dark
    margin-top: .25rem
    font:
      family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif
      weight: bold
      size: 1.1rem
    word-break: break-all

</style>