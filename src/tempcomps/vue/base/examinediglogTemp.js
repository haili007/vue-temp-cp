export const   examineDiglogTempStr=`
    <el-dialog
      title="审核"
      width="410px"
      :visible.sync="examineDiglogVisible"
    >
      <el-form :model="examineDiglogForm" ref="examineDiglogForm">
        <el-form-item label="备注" label-width="120px">
          <el-input
            type="textarea"
            :rows="2"
            v-model="examineDiglogForm.memo"
            size="mini"
            style="width: 140px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="sending" type="primary" @click="handleExamine(1)">审核通过</el-button>
        <el-button :disabled="sending" type="primary" @click="handleExamine(2)">审核不通过</el-button>
        <el-button @click="examineDiglogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
`
export const   batchExamineDiglogTempStr=`
    <el-dialog
      title="批量审核"
      width="410px"
      :visible.sync="batchExamineDiglogVisible"
    >
      <el-form :model="batchExamineDiglogForm" ref="batchExamineDiglogForm">
        <el-form-item label="备注" label-width="120px">
          <el-input
            type="textarea"
            :rows="2"
            v-model="batchExamineDiglogForm.memo"
            size="mini"
            style="width: 140px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="sending" type="primary" @click="handleBatchExamine(1)">审核通过</el-button>
        <el-button :disabled="sending" type="primary" @click="handleBatchExamine(2)">审核不通过</el-button>
        <el-button @click="batchExamineDiglogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
`