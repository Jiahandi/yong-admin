<template>
  <div class="strategy yong-list">
    <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
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
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input v-model="form.keywords" />
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
        <el-button size="mini">新增</el-button>
        <el-button size="mini">刷新</el-button>
      </div>
      <el-table :data="strategyList" stripe style="width: 100%">
        <el-table-column prop="strategyId" width="100" />
        <el-table-column prop="straUser" label="发布用户" align="center" />
        <el-table-column prop="straTitle" label="标题" align="center" />
        <el-table-column prop="straScenic" label="相关景点" align="center" />
        <el-table-column prop="straThemename" label="主题" align="center" />
        <!-- <el-table-column prop="straCollect" label="浏览量" align="center" /> -->
        <el-table-column prop="straContent" label="内容" align="center" />
        <el-table-column prop="straTime" label="日期" align="center" />
        <el-table-column prop="straLove" label="喜欢量" align="center" />
        <el-table-column prop="straCollect" label="收藏量" align="center" />
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
  </div>
</template>

<script>
import Theme from '@/common/theme'
import { getStrategyListPage, deleteStrategy } from '@/api/strategy'
export default {
  name: 'Strategy',
  data() {
    return {
      form: {
        keywords: ''
      },
      themeValue: '',
      filterTheme: Theme.tagTheme,
      strategyList: [],
      currentPage: 1,
      pageSize: 2,
      total: 0
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
        console.log(res)
        this.strategyList = res.records
        this.total = res.total
      })
    },
    reset() {
      this.form.keywords = ''
      this.themeValue = ''
      this.load()
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
      this.newData['opentype'] = 'update'
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
