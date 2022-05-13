<template>
  <div class="strategy yong-list">
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
            <el-form-item label="关键字">
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
        <!-- <el-button size="mini" @click="strategyAdd">新增</el-button> -->
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="strategyList" stripe style="width: 100%">
        <el-table-column type="index" label="#" width="36" :index="indexMethod" align="right" />
        <el-table-column prop="straUser" label="发布用户" align="center" />
        <el-table-column prop="straTitle" label="标题" align="center" />
        <el-table-column prop="avatar" label="攻略主题图片" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.straImage"
              style="width: 80px; height: 80px"
              :src="scope.row.straImage"
              :preview-src-list="[scope.row.straImage]"
            />
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column prop="straScenic" label="相关景点" align="center" />
        <el-table-column prop="straThemename" label="主题" align="center" />
        <!-- <el-table-column prop="straCollect" label="浏览量" align="center" /> -->
        <el-table-column prop="straContent" label="内容" align="center" />
        <el-table-column prop="straTime" label="日期" align="center" />
        <el-table-column prop="straLove" label="喜欢量" align="center" />
        <el-table-column prop="straPageview" label="浏览量" align="center" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              plain
              style="margin-right:5px"
              @click="handleEdit(scope.row)"
            >编辑</el-button> -->
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
import Theme from '@/common/theme'
import OperationPanel from '../strategy/operationPanel.vue'
import { getStrategyListPage, deleteStrategy } from '@/api/strategy'
const initDataRow = {
  straUser: '',
  straTitle: '',
  straScenic: '',
  straThemeid: '',
  straContent: '',
  straTime: '',
  straLove: 0,
  straPageview: 0
}
export default {
  name: 'Strategy',
  components: {
    OperationPanel
  },
  data() {
    return {
      form: {
        keywords: ''
      },
      themeValue: '',
      filterTheme: Theme.tagTheme,
      strategyList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogVisible: false,
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
      getStrategyListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        straThemeid: this.themeValue,
        straTitle: this.form.keywords
      }).then(res => {
        // console.log(res)
        this.strategyList = res.records
        this.total = res.total
      })
    },
    strategyAdd() {
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
      deleteStrategy({ id: row.strategyId }).then(res => {
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
