<template>
  <div class="forum yong-list">
    <div class="list-top">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="主题">
              <el-select v-model="themeValue" placeholder="请选择">
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
        </el-row>
      </el-form>
    </div>
    <div class="list-table">
      <div class="list-title"><font class="el-icon-notebook-1" /> {{ this.$route.meta.title }}</div>
      <div class="list-add">
        <el-button size="mini">新增</el-button>
        <el-button size="mini">刷新</el-button>
      </div>
      <el-table :data="forumList" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="发布用户" align="center" />
        <el-table-column prop="time" label="发布时间" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="category" label="类别" align="center" />
        <el-table-column prop="content" label="内容" align="center" />
        <el-table-column prop="pageview" label="浏览量" align="center" />
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              style="margin-right:5px"
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

  </div>
</template>

<script>
import Theme from '@/common/theme'
export default {
  name: 'Forum',
  data() {
    return {
      form: {
        keywords: ''
      },
      themeValue: '',
      filterTheme: Theme.forumTheme,
      forumList: [
        {
          id: 1,
          name: '游客1',
          image: '/static/image/mine/avatar.jpg',
          time: '2021-10-21',
          title: 'aa',
          content: 'aaaaaaaaa啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          categoryId: 1,
          category: '问题求助',
          pageview: 200
        },
        {
          id: 2,
          name: '游客1',
          image: '/static/image/mine/avatar.jpg',
          time: '2021-10-21',
          title: 'aa',
          content: 'aaaaaaaaa啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          categoryId: 1,
          category: '问题求助',
          pageview: 400
        }
      ],
      currentPage: 1
    }
  }

}

</script>
<style scoped>
</style>
