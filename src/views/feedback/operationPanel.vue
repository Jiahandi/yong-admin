<template>
  <el-dialog
    class="feedback-panel"
    :title="newData.type === 'add' ? '新增':'编辑'"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="newData" :rules="rules" :model="newData" label-width="80px">
      <el-form-item label="反馈图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="limit"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="imgDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="反馈用户" prop="fbUser">
        <el-input v-model="newData.fbUser" />
      </el-form-item>
      <el-form-item label="反馈内容" prop="fbContent">
        <el-input
          v-model="newData.fbContent"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="submiting" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addFeedback } from '@/api/feedback'
const initDataRow = {
  fbUser: '',
  fbContent: '',
  fbImage: ''
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
        fbUser: [
          { required: true, message: '请输入反馈用户', trigger: 'blur' }
        ],
        fbContent: [
          { required: true, message: '请输入反馈内容', trigger: 'blur' }
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
      const promise = this.newData.fbId ? addFeedback({
        fbUser: this.newData.fbUser,
        fbImage: this.newData.fbImage,
        fbContent: this.newData.fbContent
      }) : addFeedback({
        fbId: this.newData.fbId,
        fbUser: this.newData.fbUser,
        fbImage: this.newData.fbImage,
        fbContent: this.newData.fbContent
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
    }
  }
}

</script>
<style scoped lang="scss">
.scenic-panel{
  .el-rate{
    line-height: 2.5;
  }
}
</style>
