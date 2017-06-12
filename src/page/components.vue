<template>
  <div>
    <example title="分页">
      <div class="example">
        <div class="example-block">当前页：{{pageNum}}</div>
        <div class="example-block">
          <mrc-pagination :pageCount="30" :pageSize="20" :change="changePagination" />
        </div>
        <div class="example-block">
          <mrc-pagination :pageCount="30" :pageSize="20" :pageNum="13" />
        </div>
      </div>
    </example>
    <example title="表格">
      <div class="example">
        <div class="example-block">
          <mrc-table></mrc-table>
        </div>
      </div>
    </example>
  </div>
</template>


<script>
  import Example from '@/components/Example'
  import MrcPagination from '@/components/MrcPagination'
  import MrcTable from '@/components/MrcTable'

  export default {
    name: 'components',
    components: {
      Example,
      MrcPagination,
      MrcTable
    },
    data () {
      return {
        pageNum: 1
      }
    },
    methods: {
      changePagination (num) {
        this.pageNum = num
      }
    }
  }
</script>
