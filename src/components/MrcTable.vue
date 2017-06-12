<template>
  <div class="mrc-table">
    <div class="btn-group btn-spacing">

    </div>
    <table class="table border-horizontal hover-able even-color border">
      <thead>
      <tr>
        <th v-for="item in thName" v-if="item !== 'id'" @click="sort">{{config[item].columnComment.split(/:|\||_/g)[0]}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="td in list">
        <td v-for="th in thName" v-if="th !== 'id'">
          <template v-if="isImg(td[th])">
            <img :src="getImgUrl(th, td[th])" alt="">
          </template>
          <template v-else>
            {{transform(th, td[th])}}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="clearfix">
      <div class="pull-right">
        <mrc-pagination :pageCount="pageCount" :pageSize="pageSize" :pageNum="pageNum" :change="changePageNum" />
      </div>
    </div>
  </div>
</template>

<script>

  import format from '@/common/format'

  import MrcPagination from '@/components/MrcPagination'
  import MrcSelect from '@/components/MrcSelect'
  export default {
    name: 'mrc-table',
    props: {
      thName: {
        type: Array,
        default () {
          return []
        }
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      pageSize: {
        type: Number,
        default: 20
      },
      pageNum: {
        type: Number,
        default: 1
      },
      pageCount: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      config: {
        type: Object,
        default () {
          return {}
        }
      },
      changePageNum: {
        type: Function
      }
    },
    components: {
      MrcPagination,
      MrcSelect
    },
    data () {
      return {
        colspan: this.thName.length,
        head: []
      }
    },
    methods: {
      sort () {
        if (this.isServer()) {

        } else {

        }
      },
      isServer () {
        // false 前端分页; TRUE 后端分页
        return this.list.length < this.total
      },
      isImg (val) {
        return /.png|.jpg$/.test(val)
      },
      getImgUrl (th, td) {
        var suffix = this.config[th].columnComment.split(/_/g)[1]
        if (suffix) {
          return td + '_' + suffix
        }

        return td
      },
      transform (th, td) {
        let item = td
        let _th = this.config[th].columnComment
        switch (this.config[th].dataType) {
          case 'timestamp':
            item = format.time(_th, td)
            break
          case 'int':
            item = format.int(_th, td)
            break
        }
        return item
      }
    },
    watch: {
      thName (a) {

      }
    }
  }
</script>

<style>
  .mrc-table .table{
    width: 100%;
    margin-bottom: 20px;
  }
</style>
