<template>
  <div class="sub-comment yong-list">
    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="#" width="36" :index="indexMethod" align="right" />

        <el-table-column prop="avatar" label="被评论人头像" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.comAvatar"
              style="width: 80px; height: 80px"
              :src="scope.row.comAvatar"
              :preview-src-list="[scope.row.comAvatar]"
            />
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column prop="comName" label="被评论人名" align="center">
          <template slot-scope="scope">{{ scope.row.comName }}</template>
        </el-table-column>
        <el-table-column prop="avatar" label="评论人头像" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.subAvatar"
              style="width: 80px; height: 80px"
              :src="scope.row.subAvatar"
              :preview-src-list="[scope.row.subAvatar]"
            />
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column prop="subName" label="评论人名" align="center">
          <template slot-scope="scope">{{ scope.row.subName }}</template>
        </el-table-column>

        <el-table-column prop="subContent" label="评论内容" align="center">
          <template slot-scope="scope">{{ scope.row.subContent }}</template>
        </el-table-column>
        <el-table-column prop="subCreatetime" label="评论时间" align="center">
          <template slot-scope="scope">{{ scope.row.subCreatetime }}</template>
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
import { getSubCommentListPage, deleteSubComment } from '@/api/comment'
const initDataRow = {
  adpassword: '',
  type: '',
  typename: ''
}
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
      getSubCommentListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log('sub-comment', res.data)
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
      deleteSubComment({ id: row.id }).then(res => {
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
.sub-comment{

}
</style>
