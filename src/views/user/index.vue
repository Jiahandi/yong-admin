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
        </el-row>
      </el-form>
    </div>
    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini" @click="userAdd">新增</el-button>
        <el-button size="mini">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="avatar" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]"
            />

          </template>
        </el-table-column>

        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="4"
      />
    </div>
    <OperationPanel v-if="dialogVisible" :operation-type="operationType" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import OperationPanel from '../user/operationPanel.vue'
export default {
  name: 'User',
  components: {
    OperationPanel
  },
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [{
        avatar: require('../../assets/user_images/1.jpg'),
        name: '小红',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        avatar: require('../../assets/user_images/2.jpg'),
        name: '小兰',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        avatar: require('../../assets/user_images/3.jpg'),
        name: '小黄',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        avatar: require('../../assets/user_images/4.jpg'),
        name: '小紫',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogVisible: false,
      operationType: 'add',
      currentPage: 1
    }
  },
  methods: {
    userAdd() {
      console.log('点击新增')
      this.dialogVisible = true
    },
    closePanel() {

    }
  }
}

</script>
<style lang="scss" scoped>
.user{

}
</style>
