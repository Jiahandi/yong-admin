<template>
  <div class="feedback yong-list">
    <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="发布人">
              <el-input v-model="form.fbuser" @keydown.enter.native="load" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关键字">
              <el-input v-model="form.fbkeywords" @keydown.enter.native="load" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button style="margin-left:10px;" @click="load">搜索</el-button>
            <el-button type="primary" style="margin-left:10px;" @click="refresh">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini" @click="feedbackAdd">新增</el-button>
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="fbList" stripe style="width: 100%">
        <el-table-column prop="fbId" label="反馈编号" width="50" />
        <el-table-column prop="fbUser" label="发布用户" align="center" />
        <el-table-column prop="fbContent" label="发布内容" align="center" />
        <el-table-column prop="fbImage" label="发布图片" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.fbImage"
              style="width: 80px; height: 80px"
              :src="scope.row.fbImage"
              :preview-src-list="[scope.row.fbImage]"
            />
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column prop="fbTime" label="发布时间" align="center" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              style="margin-right:5px"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-popconfirm
              confirm-button-text="删除"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该数据吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger" plain>删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[2,5,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <OperationPanel v-if="dialogVisible" :new-data="newData" :dialog-visible.sync="dialogVisible" @close-panel="closePanel" />
  </div>
</template>

<script>
import { getFeedbackListPage, deleteFeedback } from '@/api/feedback'
import OperationPanel from '../feedback/operationPanel.vue'
const initDataRow = {
  fbUser: '',
  fbContent: '',
  fbImage: ''
}
export default {
  name: 'Feedback',
  components: {
    OperationPanel
  },
  data() {
    return {
      form: {
        fbuser: '',
        fbkeywords: ''

      },
      fbList: [],
      currentPage: 1,
      pageSize: 2,
      total: 0,
      dialogVisible: false,
      newData: initDataRow
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      getFeedbackListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        fbUser: this.form.fbuser,
        fbContent: this.form.fbkeywords
      }).then(res => {
        // console.log(res)
        this.fbList = res.records
        this.total = res.total
      })
    },
    feedbackAdd() {
      this.newData = { ...initDataRow }
      this.newData['type'] = 'add'
      this.dialogVisible = true
    },
    refresh() {
      this.form.fbuser = ''
      this.form.fbkeywords = ''
      this.load()
    },
    closePanel() {
      this.dialogVisible = false
      this.load()
    },
    handleSizeChange(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      // console.log(pageNum)
      this.currentPage = pageNum
      this.load()
    },
    handleEdit(row) {
      this.newData = row
      this.newData['type'] = 'update'
      this.dialogVisible = true
    },
    handleDelete(row) {
      // console.log('row', row)
      deleteFeedback({ id: row.fbId }).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this.load()
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  }

}

</script>
<style scoped>
</style>
