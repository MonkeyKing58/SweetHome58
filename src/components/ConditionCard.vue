<template>
  <div class="condition">
    <el-row>
        <el-col :xs="3" :sm="1" :class="icon"></el-col>
        <el-col :xs="21" :sm="23" class="condition__title">{{title}}</el-col>
      </el-row>
      <el-row>
        <el-col class="condition__text" :xs="{span:24, offset:0}" :sm="{span:23, offset:1}">{{text}}</el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'Conditioncard',
  props: ['title', 'text', 'icon']
}
</script>

<style lang="sass" scoped>

.condition
  width: 100%
  margin-top: 1rem
  margin-bottom: 2rem

  *
    color: #333

  &__icon, &__atte
    background-position: left center
    background-size: contain
    background-repeat: no-repeat
    background-image: url(~@/assets/images/icon/galka.png)

  &__atte
    background-image: url(~@/assets/images/icon/imp.png)

  &__title
    font:
      family: Montserrat, Arial, "Helvetica Neue", Helvetica, sans-serif
      weight: bold
      size: 1.3rem
    padding: .35rem 0 .35rem .5rem

  &__text
    font-size: .9rem
    line-height: 1.5rem
    padding-left: .5rem

</style>