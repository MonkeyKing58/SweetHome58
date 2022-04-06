<template>
  <el-row class="loader-wrapper">
    <div class="loader-icon"></div>
    <el-col v-loading="true"> </el-col>
  </el-row>
</template>

<style lang="sass" scoped>

.loader-wrapper
  display: flex
  margin: auto
  min-height: 100vh
  align-content: center
  justify-content: center
  margin-top: -50px

.loader-icon
  height: 75px
  width: 225px
  margin-bottom: 50px
  display: flex
  background-image: url(~@/assets/images/LOGO_LIGHT.png)!important
  background-size: contain
  background-repeat: no-repeat
  background-position: center

</style>