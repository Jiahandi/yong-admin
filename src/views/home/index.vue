<template>
  <div class="dashboard-container">
    <div class="dashboard-logo">
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
      />
    </div>
    <div class="dashboard-text">欢迎来到甬游后台管理平台</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      url: require('@/icons/logo.png')
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    text-align: center;
    font-size: 30px;
    line-height: 46px;
  }
  &-logo{
    width: 100px;
    margin: 30px auto;
  }
}
</style>
