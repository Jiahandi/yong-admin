<template>
  <div class="strategy yong-list">
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
      <el-table :data="strategyList" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="发布用户" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="spot" label="相关景点" align="center" />
        <el-table-column prop="tag" label="主题" align="center" />
        <!-- <el-table-column prop="place" label="地址" align="center" /> -->
        <el-table-column prop="pageview" label="浏览量" align="center" />
        <el-table-column prop="content" label="内容" align="center" />
        <el-table-column prop="date" label="日期" align="center" />
        <el-table-column prop="love" label="喜欢量" align="center" />
        <el-table-column prop="collect" label="收藏量" align="center" />
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
  name: 'Strategy',
  data() {
    return {
      form: {
        keywords: ''
      },
      themeValue: '',
      filterTheme: Theme.tagTheme,
      strategyList: [
        {
          imageList: [
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' },
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' },
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' }],
          userAvater: '/static/image/mine/avatar.jpg',
          username: '游客',
          title: '雪窦山一日游',
          spot: '雪窦山',
          tagId: 4,
          tag: '自然游',
          place: '宁波市奉化区溪口镇西北',
          pageview: '500',
          content: '哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈',
          date: '2021-11-18',
          love: '400',
          collect: '212'
        },
        {
          imageList: [
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' },
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' },
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' }],
          userAvater: '/static/image/mine/avatar.jpg',
          username: 'wwwwwww',
          title: '雪窦山一日游',
          spot: '雪窦山',
          tagId: 4,
          tag: '自然游',
          place: '宁波市奉化区溪口镇西北',
          pageview: '500',
          content: '这里很美',
          date: '2021-11-18',
          love: '400',
          collect: '212'
        },
        {
          imageList: [
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' },
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' },
            { id: 1, src: 'url1', image: '/static/image/home/advertisement1.jpg' },
            { id: 2, src: 'url2', image: '/static/image/home/advertisement2.jpg' },
            { id: 3, src: 'url3', image: '/static/image/home/advertisement3.jpg' }],
          userAvater: '/static/image/mine/avatar.jpg',
          username: '游客',
          title: '动物园哈哈哈哈',
          spot: '雅戈尔动物园',
          tagId: 4,
          tag: '自然游',
          place: '宁波市奉化区溪口镇西北',
          pageview: '500',
          content: '推荐推荐',
          date: '2021-11-18',
          love: '400',
          collect: '212'
        }
      ],
      currentPage: 1
    }
  }

}

</script>
<style scoped>
</style>
