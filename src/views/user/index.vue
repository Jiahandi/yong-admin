<template>
  <div class="user-list">
    <div class="user-filter">
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
    <div class="user-table">
      <div class="user-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="user-add">
        <el-button size="mini" @click="userAdd">新增</el-button>
        <el-button size="mini">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="avatar" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
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
      operationType: 'add'

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
.user-list{
  width: 96%;
  margin: 0 auto;
  margin-top: 20px;
  .user-filter{
    padding: 10px 0;
    width: 100%;
    height: 60px;
    background-color: #f5f7fa;
    margin-bottom: 20px;
  }
  .user-table{
    border: 1px solid #f5f7fa;
    padding-top: 20px;
    .user-title{
      margin-left: 10px;
      color: #409eff;
      float:left;
    }
    .user-add{
      float: right;
      margin-right: 10px;
    }
  }
}
</style>
