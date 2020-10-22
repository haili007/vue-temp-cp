var formDialogTempStr=`
<template>
<el-dialog title="{{{title}}}" :visible.sync="visible" width="50%" :before-close="handleClose">
<el-form ref="form" :label-position="labelPosition" label-width="80px" :model="form">
  {{{formTemp}}}
</el-form>
<span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary" @click="submitData">确定</el-button>
    <el-button size="mini" type="primary" @click="handleClose">取 消</el-button>
</span>
</el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        form:{
            {{{form}}}
        }
      };
    },
    methods: {
        submitData(){
            console.log('submit')
        },
        handleClose(){
            this.$emit('close')
        },
        reset(){
            this.$refs['form'].resetFields();
        }
    }
  }
</script>`

