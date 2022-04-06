<template>
  <div class="about">
    <el-row>
      <el-col :span="5" class="about__icon" :style="{'background-image': 'url('+icon+')'}"></el-col>
      <el-col :span="19" class="about__text">
        <div class="about__title">{{title}}</div>
        <div class="about__desc">{{desc}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Aboutcard',
  props: ['title', 'desc', 'icon']
}
</script>

<style lang="sass" scoped>

.about
  width: 100%
  background-color: #fff
  border-radius: 5px
  margin: 5px
  display: flex
  box-shadow: 0 0 5px #e8e8e8
  border: solid 1px #eee
  padding: 10px

  &__title
    font:
      family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif
      weight: bold
      size: 1.1rem
    color: $color-theme-blue-dark
    width: 100%
    margin-bottom: .25rem

  &__desc
    font-size: .9rem
    width: 100%
    color: #777

  &__icon
    height: 4rem
    background-repeat: no-repeat
    background-size: contain
    background-position: center
    margin: .5rem 0

  &__text
    display: flex
    flex-wrap: wrap
    align-content: center
    padding-left: 10px

</style>