<template>
  <div class="scenic yong-list">
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
            <el-form-item label="景点名称">
              <el-input v-model="form.name" @keydown.enter.native="load" />
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
        <el-button size="mini" @click="scenicAdd">新增</el-button>
        <el-button size="mini" @click="refresh">刷新</el-button>
      </div>
      <el-table :data="scenicList" stripe style="width: 100%">
        <el-table-column type="index" label="#" width="36" :index="indexMethod" align="right" />
        <el-table-column prop="scePicture" label="图片" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.scePicture"
              style="width: 80px; height: 80px"
              :src="scope.row.scePicture"
              :preview-src-list="[scope.row.scePicture]"
            />
            <div v-else>-</div>
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
import OperationPanel from '../scenic/operationPanel.vue'
import { getScenicListPage, deleteScenic } from '@/api/scenic'
const initDataRow = {
  scePicture: '',
  sceName: '',
  sceIntro: '',
  sceAddress: '',
  sceOpentime: '',
  sceThemeid: '',
  sceScore: 0,
  scePrice: '',
  sceTel: ''
}
export default {
  name: 'Scenic',
  components: {
    OperationPanel
  },
  data() {
    return {
      form: {
        name: ''
      },
      themeValue: '',
      filterTheme: Theme.tagTheme,
      scenicList: [],
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
      getScenicListPage({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        sceName: this.form.name,
        sceThemeid: this.themeValue
      }).then(res => {
        // console.log(res)
        this.scenicList = res.records
        this.total = res.total
      })
    },
    scenicAdd() {
      this.newData = { ...initDataRow }
      this.newData['type'] = 'add'
      this.dialogVisible = true
    },
    refresh() {
      this.form.name = ''
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
      console.log('this.newData', this.newData)
      this.newData['type'] = 'update'
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
