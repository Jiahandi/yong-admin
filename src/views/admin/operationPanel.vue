<template>
  <el-dialog
    :title="newData.opentype === 'add' ? '新增':'编辑'"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="newData" :rules="rules" :model="newData" label-width="80px">
      <el-form-item label="账号" prop="adname">
        <el-input v-model="newData.adname" />
      </el-form-item>
      <el-form-item label="密码" prop="adpassword">
        <el-input v-model="newData.adpassword" />
      </el-form-item>
      <el-form-item label="权限" prop="type">
        <el-radio-group v-model="newData.type">
          <el-radio :label="0">普通管理员</el-radio>
          <el-radio :label="1">超级管理员</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="submiting" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addAdmin } from '@/api/admin'
const initDataRow = {
  adpassword: '',
  type: '',
  typename: ''
}
export default {
  name: 'OperationPanel',
  props: {
    newData: {
      default: () => {
        return { ...initDataRow }
      },
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    limit: {
      type: [Number, String],
      default: 1
    }

  },
  data() {
    return {
      dialogImageUrl: '',
      imgDialogVisible: false,
      disabled: false,
      rules: {
        adname: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        adpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ]
      },
      submiting: false
    }
  },
  created() {
    console.log('this.newData', this.newData)
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    submitUpdate() {
      this.submiting = true
      const typename = this.newData.type === 0 ? '普通管理员' : '超级管理员'
      console.log('保存列表', this.newData)
      const promise = this.newData.adid ? addAdmin({
        adid: this.newData.adid,
        adname: this.newData.adname,
        adpassword: this.newData.adpassword,
        type: this.newData.type,
        typename: typename
      }) : addAdmin({
        adpassword: this.newData.adpassword,
        adname: this.newData.adname,
        type: this.newData.type,
        typename: typename
      })
      promise.then(
        res => {
          this.submiting = false
          if (res) {
            if (this.newData.opentype === 'add') {
              this.$message.success('新增成功')
            } else {
              this.$message.success('编辑成功')
            }
            this.$emit('close-panel')
          } else {
            this.$message.error(res['message'] || '保存失败')
          }
          // console.log('保存结果：', res)
        }).catch(_ => {
        this.submiting = false
        this.$message.error('保存失败')
      })
    },
    save() {
      this.$refs['newData'].validate((valid) => {
        if (valid) {
          this.submitUpdate()
          return
        } else {
          this.$message.error('必填项不能为空')
        }
      })
    }
  }
}

</script>
<style scoped>
</style>
