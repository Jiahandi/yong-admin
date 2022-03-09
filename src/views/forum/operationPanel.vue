<template>
  <el-dialog
    class="forum-panel"
    :title="newData.type === 'add' ? '新增':'编辑'"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="newData" :rules="rules" :model="newData" label-width="80px">
      <el-form-item label="发布人" prop="forumName">
        <el-input v-model="newData.forumName" />
      </el-form-item>
      <el-form-item label="论坛标题" prop="forumTitle">
        <el-input v-model="newData.forumTitle" />
      </el-form-item>
      <el-form-item label="论坛主题" prop="forumCategoryid">
        <el-select v-model="newData.forumCategoryid" placeholder="请选择">
          <el-option
            v-for="item in filterTheme"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="论坛内容" prop="forumContent">
        <el-input
          v-model="newData.forumContent"
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
import { addForum } from '@/api/forum'
import Theme from '@/common/theme'
const initDataRow = {
  forumName: '',
  forumTitle: '',
  forumCategoryid: '',
  forumContent: '',
  forumPageview: 0
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
      imgDialogVisible: false,
      disabled: false,
      filterTheme: Theme.forumTheme.filter(el => el.value !== 0),
      rules: {
        forumName: [
          { required: true, message: '请输入发布人', trigger: 'blur' }
        ],
        forumTitle: [
          { required: true, message: '请输入论坛主题', trigger: 'blur' }
        ],
        forumContent: [
          { required: true, message: '请输入论坛内容', trigger: 'blur' }
        ],
        forumCategoryid: [
          { required: true, message: '请选择主题类别', trigger: 'change' }
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
      switch (this.newData.forumCategoryid) {
        case 1: this.newData.forumCategoryname = '问题求助'
          break
        case 2: this.newData.forumCategoryname = '意见建议'
          break
        case 3: this.newData.forumCategoryname = '线路讨论'
          break
        default:
          break
      }
      console.log('保存列表', this.newData)
      const promise = this.newData.forumId ? addForum({
        forumName: this.newData.forumName,
        forumTitle: this.newData.forumTitle,
        forumCategoryid: this.newData.forumCategoryid,
        forumCategoryname: this.newData.forumCategoryname,
        forumContent: this.newData.forumContent,
        forumPageview: this.newData.forumPageview
      }) : addForum({
        forumId: this.newData.forumId,
        forumName: this.newData.forumName,
        forumTitle: this.newData.forumTitle,
        forumCategoryid: this.newData.forumCategoryid,
        forumCategoryname: this.newData.forumCategoryname,
        forumContent: this.newData.forumContent,
        forumPageview: this.newData.forumPageview
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
