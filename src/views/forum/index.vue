<template>
  <div class="forum yong-list">
    <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="主题">
              <el-select v-model="themeValue" placeholder="请选择" @change="load">
                <el-option
                  v-for="item in filterTheme"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="标题">
              <el-input v-model="form.keywords" @keydown.enter.native="load" />
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
        <el-button size="mini" @click="forumAdd">新增</el-button>
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="forumList" stripe style="width: 100%">
        <el-table-column prop="forumId" label="论坛编号" width="50" />
        <el-table-column prop="forumName" label="发布用户" align="center" />
        <el-table-column prop="forumTime" label="发布时间" align="center" />
        <el-table-column prop="forumTitle" label="标题" align="center" />
        <el-table-column prop="forumCategoryname" label="类别" align="center" />
        <el-table-column prop="forumContent" label="内容" align="center" />
        <el-table-column prop="forumPageview" label="浏览量" align="center" />
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
import Theme from '@/common/theme'
import OperationPanel from '../forum/operationPanel.vue'
import { getForumListPage, deleteForum } from '@/api/forum'
const initDataRow = {
  forumName: '',
  forumTitle: '',
  forumCategoryid: '',
  forumContent: '',
  forumPageview: 0
}
export default {
  name: 'Forum',
  components: {
    OperationPanel
  },
  data() {
    return {
      form: {
        keywords: ''
      },
      themeValue: '',
      filterTheme: Theme.forumTheme,
      forumList: [],
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
      getForumListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        forumTitle: this.form.keywords,
        forumCategoryid: this.themeValue
      }).then(res => {
        // console.log(res)
        this.forumList = res.records
        this.total = res.total
      })
    },
    forumAdd() {
      this.newData = { ...initDataRow }
      this.newData['type'] = 'add'
      this.dialogVisible = true
    },
    refresh() {
      this.form.keywords = ''
      this.themeValue = ''
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
      deleteForum({ id: row.forumId }).then(res => {
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
