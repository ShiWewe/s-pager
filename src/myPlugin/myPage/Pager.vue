<template>
  <div class="pager-container" onselectstart="return false">
    <div class="pager">
      <span :class="{'span-disabled': isFirstClick}" @click.stop="handleClickFirst">
        <strong>{{prevText}}</strong>
      </span>
      <span :class="{'span-disabled': isFirstClick}" @click.stop="handleClickPrev">
        <strong>{{prevPageText}}</strong>
      </span>
      <template v-for="(item, idx) in showPageList">
        <span :key="idx" :class="{'isCurrentPage': emitPage == item, 'ellipsis': item == '...'}" :style="borderStyle(item)" @click.stop="handleClickPage(item, idx)">
          <strong>{{ item }}</strong>
        </span>
      </template>
      <span :class="{'span-disabled': isLastClick}" @click.stop="handleClickNext">
        <strong>{{nextPageText}}</strong>
      </span>
      <span :class="{'span-disabled': isLastClick}" @click.stop="handleClickLast">
        <strong>{{nextText}}</strong>
      </span>
      <i class="page-tip">共 {{ pageTotal }} 页 / {{ total }} 条数据</i>&nbsp;
      <i class="page-tools">
        <i>跳转到</i>
        <input :style="borderStyle(null)" class="ipt-current" type="text" v-model="iptCurrent" @keydown.enter.stop="handleEnterPage" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
        <i>页</i>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-pager',
  props: {
    // 首页显示文字
    prevText: {
      type: String,
      default: '首页'
    },
    // 上一页显示文字
    prevPageText: {
      type: String,
      default: '上一页'
    },
    // 末页显示文字
    nextText: {
      type: String,
      default: '末页'
    },
    // 下一页显示文字
    nextPageText: {
      type: String,
      default: '下一页'
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 分页个数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总个数
    total: {
      type: Number,
      default: 0
    },
    // 主题色值
    themeColor: {
      type: String,
      default: '#409eff'
    }
  },
  data () {
    return {
      // 页面显示长度
      showPageIdx: 5,
      // 总页数
      pageTotal: 0,
      // 输入的页面
      iptCurrent: 1,
      // 显示页面数组
      showPageList: [],
      // 避免prop单向传输，将currentPage赋值给emitPage
      emitPage: 1
    }
  },
  created () {
    this.pageTotal = Math.ceil(Number.parseFloat(this.total) / Number.parseFloat(this.pageSize))
    console.log(`%c 总页数是 : ${this.pageTotal}`, 'color:green;')
    this.emitPage = this.currentPage
    this.initRenderPage()
  },
  computed: {
    // 首页和上一页是否可以点击
    isFirstClick () {
      return !!(this.total == 0 || this.emitPage == 1)
    },
    // 末页和下一页是否可以点击
    isLastClick () {
      return !!(this.total == 0 || this.emitPage == this.pageTotal)
    },
    borderStyle () {
      return function (e) {
        if (e && e == this.emitPage) {
          return {
            'background-color': this.themeColor
          }
        } else {
          return {
            'border-color': this.themeColor
          }
        }
      }
    }
  },
  watch: {
    'emitPage' (val) {
      this.$emit("current-change", this.emitPage);
      // console.log(`%c 监听当前页码是 : ${val}`, 'color:orange;')
    }
  },
  methods: {
    // 点击页码
    handleClickPage (e) {
      if (String(e).indexOf('...') > -1) {
        return false
      } else {
        this.emitPage = Number.parseFloat(e)
        this.$emit("update:currentPage", this.emitPage);
        if (e < this.showPageIdx) {
          // console.log(`%c 1当前点击的页码是 : ${this.emitPage}`, 'color:purple;')
          this.initRenderPage()
        } else if ((e > this.pageTotal - 2) && (e <= this.pageTotal - 1)) {
          // console.log(`%c 2当前点击的页码是 : ${this.emitPage}`, 'color:purple;')
          this.showPageList.length = 0
          this.showPageList.push(1, 2, '...')
          for (let i = this.pageTotal - 2; i <= this.pageTotal; i++) {
            this.showPageList.push(i)
          }
        } else if (e <= this.pageTotal - 2) {
          // console.log(`%c 3当前点击的页码是 : ${this.emitPage}`, 'color:purple;')
          this.showPageList.length = 0
          this.showPageList.push(1, 2, '...', this.emitPage - 1, this.emitPage, this.emitPage + 1, '...')
        } else {
          // console.log(`%c 5当前点击的页码是 : ${this.emitPage}`, 'color:purple;')
          return false
        }
      }
    },
    // 点击上一页
    handleClickPrev () {
      if (this.emitPage > 1) {
        this.emitPage--
        if (this.emitPage <= this.showPageIdx) {
          // console.log(`%c 1点击了上一页，当前页码是 : ${this.emitPage}`, 'color:red;')
          this.initRenderPage()
        } else if (this.emitPage <= this.pageTotal - 2) {
          // console.log(`%c 2点击了上一页，当前页码是 : ${this.emitPage}`, 'color:red;')
          this.showPageList.length = 0
          this.showPageList.push(1, 2, '...', this.emitPage - 1, this.emitPage, this.emitPage + 1, '...')
        } else {
          // console.log(`%c 2点击了上一页，当前页码是 : ${this.emitPage}`, 'color:red;')
          return false
        }
        this.$emit("prev-click-change", this.emitPage);
      }
    },
    // 点击下一页
    handleClickNext () {
      if (this.emitPage < this.pageTotal) {
        this.emitPage++
        if (this.emitPage >= this.showPageIdx) {
          if (this.emitPage <= this.pageTotal - 2) {
            // console.log(`%c 1点击了下一页，当前页码是 : ${this.emitPage}`, 'color:blue;')
            this.showPageList.length = 0
            this.showPageList.push(1, 2, '...', this.emitPage - 1, this.emitPage, this.emitPage + 1, '...')
          } else if (this.emitPage <= this.pageTotal - 1) {
            // console.log(`%c 2点击了下一页，当前页码是 : ${this.emitPage}`, 'color:blue;')
            this.showPageList.length = 0
            this.showPageList.push(1, 2, '...')
            for (let i = this.pageTotal - 2; i <= this.pageTotal; i++) {
              this.showPageList.push(i)
            }
          } else {
            // console.log(`%c 3点击了下一页，当前页码是 : ${this.emitPage}`, 'color:blue;')
            return false
          }
        }
        this.$emit("next-click-change", this.emitPage);
      }
    },
    // 点击首页
    handleClickFirst () {
      this.initRenderPage()
      this.emitPage = 1
    },
    // 点击末页
    handleClickLast () {
      this.showPageList.length = 0
      if (this.showPageIdx < this.pageTotal) {
        this.showPageList.push(1, 2, '...')
        for (let i = this.pageTotal - 2; i <= this.pageTotal; i++) {
          this.showPageList.push(i)
        }
      } else {
        this.showPageList = Array.from(new Array(this.pageTotal)).map((item, idx) => ++idx)
      }
      this.emitPage = this.pageTotal
    },
    // 初始化渲染页码（）
    initRenderPage () {
      this.showPageList.length = 0
      if (this.showPageIdx < this.pageTotal) {
        this.showPageList = Array.from(new Array(this.showPageIdx)).map((item, idx) => ++idx)
        this.showPageList.push('...')
      } else {
        this.showPageList = Array.from(new Array(this.pageTotal)).map((item, idx) => ++idx)
      }
    },
    // 输入页面跳转
    handleEnterPage () {
      let current = Number.parseFloat(this.iptCurrent)
      if (current) {
        if (current >= this.pageTotal) {
          this.handleClickLast()
        } else if (current <= 0) {
          this.handleClickFirst()
        } else {
          this.handleClickPage(Number.parseFloat(this.iptCurrent))
        }
      } else {
        this.handleClickFirst()
      }
      this.$nextTick(() => {
        this.iptCurrent = this.emitPage
      })
    }
  }
}
</script>

<style>
.pager-container {
  font-size: 14px;
}
.pager-container .pager {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}
i {
  font-style: normal;
}
.pager-container .pager span {
  margin: 0 5px;
  padding: 4px 6px;
  color: #606266;
  background-color: #f4f4f5;
  border-radius: 2px;
  cursor: default;
}
.pager-container .pager span:not(.ellipsis) {
  cursor: pointer;
}
.pager-container .pager span.isCurrentPage {
  color: #fff;
  background-color: #409eff;
  border-radius: 2px;
}
span > strong {
  display: inline-block;
  min-width: 20px;
  height: 25px;
  line-height: 25px;
  font-weight: normal;
}
.pager-container .pager span.span-disabled {
  color: #aaa;
  background-color: #ddd;
  cursor: not-allowed;
}
.page-tools {
  display: flex;
  align-items: center;
}
.page-tools .ipt-current {
  margin: 0 4px;
  padding: 2px 4px;
  width: 40px;
  height: 25px;
  text-align: center;
  outline: none;
  border-radius: 5px;
  border: 1px solid #409eff;
}
</style>
