<template>
  <div class="files yong-list">
    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="#" width="36" :index="indexMethod" align="right" />

        <el-table-column prop="url" label="url" align="center" width="500">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="size" label="大小" align="center">
          <template slot-scope="scope">{{ scope.row.size }}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
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
  </div>
</template>

<script>
import { getFilesListPage, deleteFiles } from '@/api/file'

export default {
  name: 'User',
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
      total: 0
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
      getFilesListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        // console.log('files', res.data)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    refresh() {
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
    handleDelete(row) {
      // console.log('row', row)
      deleteFiles({ id: row.id }).then(res => {
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
.files{

}
</style>
