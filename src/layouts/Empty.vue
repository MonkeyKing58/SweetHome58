<template>
  <div class="empty-wrapper">

    <el-row class="empty-logo" @click="$router.push('/')">
      <el-col :xs="20" :sm="20" :md="16" :lg="8"></el-col>
    </el-row>

    <el-row class="empty-contaner">
      <el-col :xs="20" :sm="20" :md="16" :lg="8">
        <router-view />
      </el-col>
    </el-row>

    <LowerBar class="hidden-sm-and-up" />
  </div>
</template>

<script>
import LowerBar from '@/components/LowerBar'
import messages from '@/utils/messages'

export default {
  name: 'empty-layout',

  data:() => {
    return {
      loading: true
    }
  },

  computed: {
		error() {
			return this.$store.getters.error
		}
	},

	watch: {
		error(fbError) {			
			this.$message({
				message: messages[fbError.code].message,
				type: messages[fbError.code].type
			})
		}
	},

  components: {
    LowerBar
  }
}
</script>

<style lang="sass" scoped>

.empty-wrapper
  min-height: 100vh
  height: 100%
  width: 100%
  display: flex
  flex-wrap: wrap
  background-color: #f5f5f5
  justify-content: center
  align-content: center

  .el-row
    width: 100%

.empty-contaner
  justify-content: center
  align-items: center

  .el-col
    background-color: #fff
    border-radius: 1rem
    box-shadow: inset 0 0 1px #ddd

.empty-logo
  justify-content: center
  margin-bottom: 1rem

  .el-col
    height: 5rem
    background-size: auto 100%
    background-repeat: no-repeat
    background-position: center
    background-image: url(~@/assets/images/LOGO_LIGHT_f5.png)

</style>