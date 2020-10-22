export const listTempVueStr = `
<template>
  <div>
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
  mounted() {
   this.getList()
  },
  components: {
    {{{component}}}
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
    handleExport(){

    },
    resetQuery(){
        this.$refs['form'].resetFields();
    },
    {{{otherMethod}}}
  },
}
</script>

<style scoped>

</style>
`
export const listTempHtmlStr = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src='https://kz-fe.oss-cn-hangzhou.aliyuncs.com/lib/vue.min@2.5.16.js'></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
</head>

<body>
    <div id="app">
        <div class="query-container">
            <el-form :model="form" label-width="100px" inline>
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
            <el-table ref="grid" :data="list.data" v-loading="list.loading" border size="mini">
                <el-table-column type="index" label="序号" width="50" header-align="center" align="center">
                </el-table-column>
                {{{table}}}
            </el-table>
        </div>
        <el-row>
            <el-pagination layout="total, prev, pager, next" @size-change="handleSizeChange" :total="list.total"
                :current-page.sync="list.curPage" @current-change="handleCurrentChange"
                :page-sizes="[20, 100, 500, 1000]" :page-size="list.pageSize"></el-pagination>
        </el-row>
        {{{dialogTemp}}}
    </div>
</body>
<script>
    var Main = {
        name: '{{{name}}}',
        data:function() {
            return {
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
        mounted() {
            this.getList()
        },
        methods: {
            getList:function() {
            },
            handleSearch:function() {
                this.list.curPage = 1
                this.getList()
            },
            handleSizeChange:function(pagesize) {
                this.list.pageSize = this.query.page.size = pagesize
                this.getList()
            },
            handleCurrentChange:function(page) {
                this.list.curPage = this.query.page.number = page
                this.getList()
            },
            resetQuery:function() {
                this.$refs['form'].resetFields();
            }
            async handleExport() {
              // let res = await RebateAdjustmentExportflowlist(this.form)
              // if (res.code == 0) {
              //   func.downloadFile(res.data)
              // } else {
              //   this.$message({ type: 'warning', message: res.message ? res.message : '导出出错！' })
              // }
            },
            {{{otherMethod}}},
            
        }
    }
    var Ctor = Vue.extend(Main)
    vm = new Ctor().$mount('#app')
</script>

</html>




`