<template>
  <div class="pagination btn-group btn-primary" v-if="count > 1">
    <a class="btn btn-info btn-single" :class="prevClass" @click="prev" v-show="currentPage > 1">{{prevText}}</a>
    <a class="btn btn-info btn-single" :class="{disabled:item.type==0, active:currentPage===item.name}" v-for="item in list"
       @click="toggle(item)">{{item.name}}</a>
    <a class="btn btn-info btn-single" :class="nextClass" @click="next" v-show="currentPage < count">{{nextText}}</a>
  </div>
</template>

<script>
  export default {
    name: 'mrc-pagination',
    props: {
      total: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageCount: {
        type: Number,
        default: 1
      },
      pageNum: {
        type: Number,
        default: 1
      },
      prevClass: {
        type: String,
        default: 'prev'
      },
      prevText: {
        type: String,
        default: '上一页'
      },
      nextClass: {
        type: String,
        default: 'next'
      },
      nextText: {
        type: String,
        default: '下一页'
      },
      distance: {
        type: Number,
        default: 3
      },
      jump: {
        type: Boolean,
        default: true
      },
      change: {
        type: Function
      }
    },
    data () {
      return {
        list: [],
        currentPage: 1,
        count: this.pageCount
      }
    },
    methods: {
      setPageCount (count) {
        this.count = count
        this.updateData()
      },
      updateData () {
        let _list = []

        if (this.count <= this.distance * 3) {
          for (let n = 1; n <= this.count; n++) {
            _list.push({
              name: n,
              type: 1
            })
          }
          this.list = _list
          return false
        }

        // type 0 文字指示 1 按钮 2 disabled
        if (this.currentPage - this.distance > 1) {
          _list.push({
            name: 1,
            type: 1
          })

          if (this.currentPage - this.distance > 2) {
            _list.push({
              name: '...',
              type: 0
            })
          }
        }

        let left = this.currentPage - this.distance
        for (let n = (left <= 0 ? 1 : left); n < this.currentPage; n++) {
          _list.push({
            name: n,
            type: 1
          })
        }

        let right = this.currentPage + this.distance
        for (let n = this.currentPage; n <= (right > this.count ? this.count : right); n++) {
          _list.push({
            name: n,
            type: 1
          })
        }

        if ((this.currentPage + this.distance) < this.count) {
          if ((this.currentPage + this.distance) < this.count - 1) {
            _list.push({
              name: '...',
              type: 0
            })
          }
          _list.push({
            name: this.count,
            type: 1
          })
        }
        this.list = _list
      },
      prev () {
        this.currentPage--
        this.updateData()
        if (this.change) {
          this.change(this.currentPage)
        }
      },
      next () {
        this.currentPage++
        this.updateData()
        if (this.change) {
          this.change(this.currentPage)
        }
      },
      toggle (item) {
        if (item.type) {
          this.currentPage = item.name
          this.updateData()
          if (this.change) {
            this.change(this.currentPage)
          }
        }
      }
    },
    mounted () {
      this.currentPage = this.pageNum
      this.updateData()
    },
    watch: {
      pageCount (a) {
        this.count = a
        this.updateData()
      }
    }
  }
</script>


<style>
  .pagination .btn:hover {
    text-decoration: none;
  }

  .pagination .btn.disabled, .pagination .btn.disabled:hover{
    cursor: auto !important;
    background-color: #ffffff;
    border-color: #ffffff;
    border-left-color: #dcdcdc;
    color: #787878;
  }

  .pagination .btn.disabled:hover + .btn {
    border-left-color: #dcdcdc;
  }
</style>
