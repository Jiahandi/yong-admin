<template>
  <div class="user yong-list">
    <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-left:10px;" @click="load">搜索</el-button>
            <el-button type="primary" style="margin-left:10px;" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini" @click="userAdd">新增</el-button>
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="50" />
        <el-table-column prop="avatar" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]"
            />

          </template>
        </el-table-column>

        <el-table-column prop="username" label="用户名" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column prop="password" label="密码" align="center">
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column>
        <el-table-column prop="tel" label="电话" align="center">
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
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
    <OperationPanel v-if="dialogVisible" :new-data="newData" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import OperationPanel from '../user/operationPanel.vue'
import request from '@/utils/request'
const initDataRow = {
  avatar: '',
  name: '',
  password: '',
  tel: '',
  email: ''
}
export default {
  name: 'User',
  components: {
    OperationPanel
  },
  data() {
    return {
      form: {
        name: '',
        password: '',
        tel: '',
        email: ''
      },
      tableData: [],
      dialogVisible: false,
      operationType: 'add',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      newData: initDataRow
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      // 请求分页查询数据
      request.get('http://localhost:9090/user/page?', {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          username: this.form.name
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
      })
    },
    userAdd() {
      this.newData = { ...initDataRow }
      this.newData['type'] = 'add'
      this.dialogVisible = true
    },
    reset() {
      this.form.name = ''
      this.load()
    },
    refresh() {
      this.form.name = ''
      this.load()
    },
    closePanel() {

    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
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
      request.delete('http://localhost:9090/user/' + row.id).then(res => {
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
<style lang="scss" scoped>
.user{

}
</style>
