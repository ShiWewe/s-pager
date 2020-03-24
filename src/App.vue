<template>
  <div id="app">
    <div class="page-box">
      <s-pager ref="pager" :themeColor="themeColor" :current-page.sync="currentPage" :pageSize="pageSize" :total="total" @current-change="gotoPage" @prev-click-change="handlePrevChange" @next-click-change="handleNextChange" />
    </div>
  </div>
</template>

<script>
import sPager from 's-pager'

export default {
  name: 'app',
  components: {
    sPager
  },
  data () {
    return {
      themeColor: 'red',
      currentPage: 1,
      pageSize: 10,
      total: 99
    }
  },
  methods: {
    gotoPage (e) {
      console.log(`当前页码是：${e}`)
    },
    handlePrevChange (e) {
      console.log(`点击的上一页：${e}`)
    },
    handleNextChange (e) {
      console.log(`点击的下一页：${e}`)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
