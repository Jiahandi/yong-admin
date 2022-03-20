<template>
  <el-dialog
    class="scenic-panel"
    :title="newData.type === 'add' ? '新增':'编辑'"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="newData" :rules="rules" :model="newData" label-width="80px">
      <el-form-item label="景点" prop="scePicture">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9090/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="newData.scePicture" :src="newData.scePicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="景点名称" prop="sceName">
        <el-input v-model="newData.sceName" />
      </el-form-item>
      <el-form-item label="简介" prop="sceIntro">
        <el-input
          v-model="newData.sceIntro"
          type="textarea"
          :rows="2"
        />
      </el-form-item>
      <el-form-item label="地址" prop="sceAddress">
        <el-input v-model="newData.sceAddress" />
      </el-form-item>
      <el-form-item label="开放时间" prop="sceOpentime">
        <el-input v-model="newData.sceOpentime" />
      </el-form-item>
      <el-form-item label="主题" prop="sceThemeid">
        <el-select v-model="newData.sceThemeid" placeholder="请选择">
          <el-option
            v-for="item in filterTheme"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="newData.type === 'add'" label="评分" prop="sceScore">
        <el-rate
          v-model="newData.sceScore"
        />
      </el-form-item>
      <el-form-item v-else label="评分" prop="sceScore">
        <el-rate
          v-model="newData.sceScore"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
      </el-form-item>
      <el-form-item label="价格" prop="scePrice">
        <el-input v-model="newData.scePrice" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="submiting" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addScenic } from '@/api/scenic'
import Theme from '@/common/theme'
const initDataRow = {
  forumName: '',
  forumTitle: '',
  forumCategoryid: 0,
  forumContent: '',
  forumPageview: ''
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
        sceName: [
          { required: true, message: '请输入景点名', trigger: 'blur' }
        ],
        sceThemeid: [
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
      switch (this.newData.sceThemeid) {
        case 1: this.newData.sceThemename = '综合游'
          break
        case 2: this.newData.sceThemename = '红色游'
          break
        case 3: this.newData.sceThemename = '文化游'
          break
        case 4: this.newData.sceThemename = '自然游'
          break
        case 5: this.newData.sceThemename = '美食游'
          break
        default:
          break
      }
      console.log('保存列表', this.newData)
      const promise = this.newData.scenicId ? addScenic({
        scenicId: this.newData.scenicId,
        scePicture: this.newData.scePicture,
        sceName: this.newData.sceName,
        sceIntro: this.newData.sceIntro,
        sceAddress: this.newData.sceAddress,
        sceOpentime: this.newData.sceOpentime,
        sceThemename: this.newData.sceThemename,
        sceThemeid: this.newData.sceThemeid,
        sceScore: this.newData.sceScore,
        scePrice: this.newData.scePrice,
        sceTel: this.newData.sceTel
      }) : addScenic({
        scePicture: this.newData.scePicture,
        sceName: this.newData.sceName,
        sceIntro: this.newData.sceIntro,
        sceAddress: this.newData.sceAddress,
        sceOpentime: this.newData.sceOpentime,
        sceThemename: this.newData.sceThemename,
        sceThemeid: this.newData.sceThemeid,
        sceScore: this.newData.sceScore,
        scePrice: this.newData.scePrice,
        sceTel: this.newData.sceTel
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
      this.newData.scePicture = res
    }
  }
}

</script>
<style scoped lang="scss">
.scenic-panel{
  .el-rate{
    line-height: 2.5;
  }
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
