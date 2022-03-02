<template>
  <div class="scenic yong-list">
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
            <el-form-item label="景点名称">
              <el-input v-model="form.name" />
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
      <el-table :data="scenicList" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="image" label="图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="景点名称" align="center" />
        <el-table-column prop="content" label="简介" align="center" />
        <el-table-column prop="place" label="地址" align="center" />
        <el-table-column prop="time" label="开放时间" align="center" />
        <el-table-column prop="tag" label="主题" align="center" />
        <el-table-column prop="score" label="评分" align="center" />
        <el-table-column prop="price" label="价格" align="center">
          <template slot-scope="scope">
            {{ scope.row.price ? scope.row.price : "免费" }}
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="联系方式" align="center" />

        <el-table-column label="操作" align="center" width="150">
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
              style="margin-right:5px"
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
  name: 'Scenic',
  data() {
    return {
      form: {
        name: ''
      },
      themeValue: '',
      filterTheme: Theme.tagTheme,
      scenicList: [
        {
          image: require('../../assets/scenic_images/strategy1.jpg'),
          title: '雅戈尔动物园',
          content: '中国水域面积最大的野生动物园',
          place: '宁波市鄞州区鄞县大道(东钱湖旅游度假区)',
          time: '9:00-16:30 周一闭关，法定节假日除外',
          tagId: 4,
          tag: '自然游',
          score: '4.7',
          price: '122.0',
          tel: '15844255536'
        },
        {
          image: require('../../assets/scenic_images/strategy2.jpg'),
          title: '天一阁博物馆',
          content: '园林中的藏书楼',
          place: '浙江省宁波市海曙区天一街10号',
          time: '9:00-16:30 周一闭关，法定节假日除外',
          tagId: 3,
          tag: '文化游',
          score: '3.0',
          price: '',
          tel: '15844255536'
        },
        {
          image: require('../../assets/scenic_images/strategy3.jpg'),
          title: '月湖',
          content: '宁波人的后花园',
          place: '宁波市海曙区县学街183号-2',
          time: '9:00-16:30 周一闭关，法定节假日除外',
          tagId: 4,
          tag: '自然游',
          score: '2.0',
          price: '',
          tel: '15844255536'
        },
        {
          image: require('../../assets/scenic_images/strategy4.jpg'),
          title: '庆安会馆',
          content: '清代古建筑杰作',
          place: '鄞州区江东北路156号',
          time: '9:00-16:30 周一闭关，法定节假日除外',
          tagId: 1,
          tag: '红色游',
          score: '5.0',
          price: '7.0',
          tel: '15844255536'
        }
      ],
      currentPage: 1
    }
  }

}

</script>
<style lang="scss" scoped>
.scenic{

}
</style>
