<template>
  <el-dialog
    class="user-dialog"
    :title="newData.type === 'add' ? '新增':'编辑'"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="newData" :rules="rules" :model="newData" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="newData.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="newData.password" />
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="newData.tel" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="newData.email" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9090/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="newData.avatar" :src="newData.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="submiting" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUser } from '@/api/user'
const initDataRow = {
  avatar: '',
  name: '',
  password: '',
  tel: '',
  email: ''
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
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
      submiting: false
    }
  },

  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    submitUpdate() {
      this.submiting = true
      console.log('保存列表', this.newData)
      const promise = this.newData.id ? addUser({
        id: this.newData.id,
        username: this.newData.username,
        password: this.newData.password,
        tel: this.newData.tel,
        email: this.newData.email,
        avatar: this.newData.avatar
      }) : addUser({
        username: this.newData.username,
        password: this.newData.password,
        tel: this.newData.tel,
        email: this.newData.email,
        avatar: this.newData.avatar
      })
      promise.then(
        res => {
          this.submiting = false
          if (res) {
            if (this.newData.type === 'add') {
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
    },
    handleAvatarSuccess(res) {
      this.newData.avatar = res
    }
  }
}

</script>
<style scoped lang="scss">
.user-dialog{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
