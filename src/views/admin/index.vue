<template>
  <div class="admin yong-list">
    <!-- <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="管理员ID">
              <el-input v-model="form.adid" @keydown.enter.native="load" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button style="margin-left:10px;" @click="load">搜索</el-button>
            <el-button type="primary" style="margin-left:10px;" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div> -->
    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini" @click="adminAdd">新增</el-button>
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="#" width="36" :index="indexMethod" align="right" />

        <el-table-column prop="adname" label="账号" align="center">
          <template slot-scope="scope">{{ scope.row.adname }}</template>
        </el-table-column>
        <el-table-column prop="adpassword" label="密码" align="center">
          <template slot-scope="scope">{{ scope.row.adpassword }}</template>
        </el-table-column>
        <el-table-column prop="type" label="管理员编号" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column prop="typename" label="管理员类型" align="center" />
        <el-table-column label="操作" align="center" width="200">
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
        :page-sizes="[5,10,20]"
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
import OperationPanel from '../admin/operationPanel.vue'
import { getAdminListPage, deleteAdmin } from '@/api/admin'
const initDataRow = {
  adpassword: '',
  type: '',
  typename: ''
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
      pageSize: 5,
      total: 0,
      newData: initDataRow
    }
  },
  computed: {
    indexMethod() {
      return i => {
        return (this.currentPage - 1) * this.pageSize + i + 1
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      // 请求分页查询数据
      getAdminListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        adid: this.form.adid
      }).then(res => {
        // console.log(res)
        this.tableData = res.records
        this.total = res.total
      })
    },
    adminAdd() {
      this.newData = { ...initDataRow }
      this.newData['opentype'] = 'add'
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
      this.newData['opentype'] = 'update'
      this.dialogVisible = true
    },
    handleDelete(row) {
      // console.log('row', row)
      deleteAdmin({ id: row.adid }).then(res => {
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
.admin{

}
</style>
