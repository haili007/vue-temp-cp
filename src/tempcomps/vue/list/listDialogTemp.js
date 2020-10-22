export const  listDialogTempStr = `
<template>
<div>
 <el-dialog title="{{{title}}}" :visible.sync="visible" width="50%" :before-close="handleClose">
    <div class="query-container">
      <el-form :model="form" ref="form" label-width="100px" inline>
        {{{queryTemp}}}
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    {{{headFuncTemp}}}
    <div class="grid-container">
      <el-table
        ref="grid"
        :data="list.data"
        v-loading="list.loading"
        v-fitheight
        border
        size="mini"
      >
        <el-table-column   type="index" label="序号" width="50" header-align="center" align="center"></el-table-column>
        {{{table}}}
      </el-table>
    </div>
    <el-row>
      <el-pagination
        align="center"
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        :total="list.total"
        :current-page.sync="list.curPage"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 100, 500, 1000]"
        :page-size="list.pageSize"
      ></el-pagination>
    </el-row>
   
    <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleClose">确定</el-button>
        <el-button size="mini" type="primary" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
    {{{dialogTemp}}}
    </div>   
</template>
<script>
//import {{{{funcname}}}} from '{{{url}}}'
{{{importcomponent}}}
export default {
  name: '{{{name}}}',
  data() {
    return {
      times:[],
      list: {
        loading: false,
        data: [],
        curPage: 1,
        pageSize: 20,
        total: null,
      },
      form: {
        {{{query}}}
      },
      {{{other}}}
    }
  },
  props: ['visible'],
  components: {
    {{{component}}}
  },
  watch: {
    visible(val) {
      if (val) {
        this.getList()
      }
    },
  },
  mounted() {
   this.getList()
  },
  methods: {
    async getList() {
      let parmes = Object.assign({
          page: {
              size: 20,
              number: this.list.curPage
          }
      }, this.form)
      let res = await fetchChargeList(parmes)
      if (res.code == 0) {
          // for (let i = 0; i < res.data.data.length; i++) {
          //     res.data.data[i].orderTime = func.format(res.data.data[i].orderTime)
          // }
          this.list.data = res.data.data
          this.list.total = res.data.totalCounts
      } else {
          this.$message({
              type: 'error',
              message: res.message
          })
      }
    },
    handleSearch() {
      this.list.curPage =  1
      this.getList()
    },
    handleSizeChange(pagesize) {
      this.list.pageSize  = pagesize
      this.getList()
    },
    handleCurrentChange(page) {
      this.list.curPage  = page
      this.getList()
    },
    handleClose(){
      this.$emit('close')
    },
    resetQuery(){
        this.$refs['form'].resetFields();
    }
    {{{otherMethod}}},
  },
}
</script>

<style scoped>

</style>
`
