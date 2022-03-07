<template>
  <div class="scenic yong-list">
    <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="主题">
              <el-select v-model="themeValue" placeholder="请选择" @change="change">
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
            <el-form-item label="景点名称">
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
        <el-button size="mini">新增</el-button>
        <el-button size="mini">刷新</el-button>
      </div>
      <el-table :data="scenicList" stripe style="width: 100%">
        <el-table-column prop="scenicId" width="100" />
        <el-table-column prop="scePicture" label="图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="sceName" label="景点名称" align="center" />
        <el-table-column prop="sceIntro" label="简介" align="center">
          <template slot-scope="scope">
            {{ scope.row.sceIntro ? scope.row.sceIntro : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="sceAddress" label="地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.sceAddress ? scope.row.sceAddress : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="sceOpentime" label="开放时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.sceOpentime ? scope.row.sceOpentime : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="sceThemename" label="主题" align="center" />
        <el-table-column prop="sceScore" label="评分" align="center" />
        <el-table-column prop="scePrice" label="价格" align="center">
          <template slot-scope="scope">
            {{ scope.row.scePrice ? scope.row.scePrice : "免费" }}
          </template>
        </el-table-column>
        <el-table-column prop="sceTel" label="联系方式" align="center">
          <template slot-scope="scope">
            {{ scope.row.sceTel ? scope.row.sceTel : "-" }}
          </template>
        </el-table-column>

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
import { getScenicListPage, deleteScenic } from '@/api/scenic'
export default {
  name: 'Scenic',
  data() {
    return {
      form: {
        name: ''
      },
      themeValue: '',
      filterTheme: Theme.tagTheme,
      scenicList: [],
      currentPage: 1,
      pageSize: 2,
      total: 0
    }
  },
  created() {
    this.load()
  },
  methods: {
    change() {
      console.log('this.themeValue', this.themeValue)
      this.load()
    },
    load() {
      // 请求分页查询数据
      getScenicListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        sceName: this.form.name,
        sceThemeid: this.themeValue
      }).then(res => {
        console.log(res)
        this.scenicList = res.records
        this.total = res.total
      })
    },
    reset() {
      this.form.name = ''
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
      deleteScenic({ id: row.scenicId }).then(res => {
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
.scenic{

}
</style>
