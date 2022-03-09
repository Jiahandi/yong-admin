<template>
  <el-dialog
    class="strategy-panel"
    :title="newData.type === 'add' ? '新增':'编辑'"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="newData" :rules="rules" :model="newData" label-width="80px">

      <el-form-item label="发布用户" prop="straUser">
        <el-input v-model="newData.straUser" />
      </el-form-item>
      <el-form-item label="标题" prop="straTitle">
        <el-input v-model="newData.straTitle" />
      </el-form-item>
      <el-form-item label="相关景点" prop="straScenic">
        <el-input v-model="newData.straScenic" />
      </el-form-item>
      <el-form-item label="主题" prop="straThemeid">
        <el-select v-model="newData.straThemeid" placeholder="请选择">
          <el-option
            v-for="item in filterTheme"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="straContent">
        <el-input
          v-model="newData.straContent"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      <el-form-item label="发布日期" prop="straTime">
        <el-date-picker
          v-model="newData.straTime"
          type="date"
          placeholder="选择日期"
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
import { addStrategy } from '@/api/strategy'
import Theme from '@/common/theme'
const initDataRow = {
  straUser: '',
  straTitle: '',
  straScenic: '',
  straThemeid: '',
  straContent: '',
  straTime: '',
  straLove: 0,
  straCollect: 0,
  straPageview: 0
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
      filterTheme: Theme.tagTheme.filter(el => el.value !== ''),
      rules: {
        straUser: [
          { required: true, message: '请输入发布人', trigger: 'blur' }
        ],
        straTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        straThemeid: [
          { required: true, message: '请选择主题类别', trigger: 'change' }
        ],
        straContent: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
      switch (this.newData.straThemeid) {
        case 1: this.newData.straThemename = '综合游'
          break
        case 2: this.newData.straThemename = '红色游'
          break
        case 3: this.newData.straThemename = '文化游'
          break
        case 4: this.newData.straThemename = '自然游'
          break
        case 5: this.newData.straThemename = '美食游'
          break
        default:
          break
      }
      console.log('保存列表', this.newData)
      const promise = this.newData.strategyId ? addStrategy({
        strategyId: this.newData.strategyId,
        straUser: this.newData.straUser,
        straTitle: this.newData.straTitle,
        straScenic: this.newData.straScenic,
        straContent: this.newData.straContent,
        straThemename: this.newData.straThemename,
        straThemeid: this.newData.straThemeid,
        straTime: this.newData.straTime,
        straLove: this.newData.straLove,
        straCollect: this.newData.straCollect,
        straPageview: this.newData.straPageview
      }) : addStrategy({
        straUser: this.newData.straUser,
        straTitle: this.newData.straTitle,
        straScenic: this.newData.straScenic,
        straContent: this.newData.straContent,
        straThemename: this.newData.straThemename,
        straThemeid: this.newData.straThemeid,
        straTime: this.newData.straTime,
        straLove: this.newData.straLove,
        straCollect: this.newData.straCollect,
        straPageview: this.newData.straPageview
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
.strategy-panel{
}
</style>
