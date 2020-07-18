<template>
  <div class="pagination">
    <button :disabled="currentPageNum === 1" @click="$emit('changePage',currentPageNum-1)">上一页</button>
    <button
      v-show="startEnd.start > 1"
      :class="{active:currentPageNum === 1}"
      @click="$emit('changePage',1)"
    >1</button>
    <button v-show="startEnd.start > 2">···</button>

    <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{active:currentPageNum === page}"
      @click="$emit('changePage',page)"
    >{{page}}</button>

    <button v-show="startEnd.end < totalPage-1">···</button>
    <button
      v-show="startEnd.end < totalPage"
      :class="{active:currentPageNum === totalPage}"
      @click="$emit('changePage',totalPage)"
    >{{totalPage}}</button>
    <button
      :disabled="currentPageNum === totalPage "
      @click="$emit('changePage',currentPageNum+1)"
    >下一页</button>

    <button style="margin-left: 30px">{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    continueNum: {
      type: Number,
      default: 5
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页起始和结束
    startEnd() {
      let { currentPageNum, totalPage, continueNum } = this;
      let start;
      let end;
      if (totalPage <= continueNum) {
        start = 1;
        end = totalPage;
      } else {
        start = currentPageNum - Math.floor(continueNum / 2);
        end = currentPageNum + Math.floor(continueNum / 2);
        if (start <= 1) {
          let disNum = 1 - start;
          start += disNum;
          end += disNum;
        }
        if (end >= totalPage) {
          let disNum = end - totalPage;
          start -= disNum;
          end -= disNum;
        }
      }
      return { start, end };
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
