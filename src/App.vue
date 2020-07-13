<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-if="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {reqCategoryList} from '@/api'
export default {
  name: '',
  components:{
    Header,
    Footer
  },
/*   mounted(){
    reqCategoryList()
  } */
}
</script>

<style lang="less" scoped>

</style>
