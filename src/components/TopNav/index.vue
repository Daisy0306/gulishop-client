<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="currentIndex = -1">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                :class="{item_on:currentIndex===index}"
                @mouseenter="moveIn(index)"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
              >
                <h3>
                  <!-- <a href>{{c1.categoryName}}</a> -->
                  <!-- 方案1：修改为声明式导航 -->
                  <!-- <router-link
                    to="{name:'search,query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                  >{{c1.categoryName}}</router-link>-->

                  <!-- 方案2：编程式导航 -->
                  <!-- <a
                    href="javascript:;"
                    @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})"
                  >{{c1.categoryName}}</a>-->

                  <!-- 方案3：事件委派 -->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <a href>{{c2.categoryName}}</a> -->
                        <!-- 方案1：修改为声明式导航 -->
                        <!-- <router-link
                          to="{name:'search,query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                        >{{c2.categoryName}}</router-link>-->

                        <!-- 方案2：编程式导航 -->
                        <!-- <a
                          href="javascript:;"
                          @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})"
                        >{{c2.categoryName}}</a>-->

                        <!-- 方案3：事件委派 -->
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- <a href>{{c3.categoryName}}</a> -->
                          <!-- 方案1：修改为声明式导航，发现页面会卡顿，在鼠标在菜单栏上移动的时候
                          【每次创建一个标签都会创建一个新的对象，创建的太多就造成页面卡顿】-->
                          <!-- <router-link
                            to="{name:'search,query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                          >{{c3.categoryName}}</router-link>-->

                          <!-- 方案2：编程式导航 -->
                          <!-- 修改为编程式导航，卡的不厉害了，因为我们使用事件处理，不会创建很多的组件对象，
                          但是会出现很多的事件回调，内存占用比较大，效率还是不高，最终决定使用事件委派来解决-->
                          <!-- <a
                            href="javascript:;"
                            @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})"
                          >{{c3.categoryName}}</a>-->

                          <!-- 方案3：事件委派 -->
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import _ from "lodash"; // 打包后的项目体积过大， _ 代表lodash
import throttle from "lodash/throttle"; // 引入lodash，局部引入
export default {
  name: "TopNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  // 发送请求放在 TopNav组件中，点击 Home 和 Search 组件的时候都会发送请求三级导航的请求
  // 数据是一样的，请求会发送很多次，浪费宽带资源
  // mounted() {
  //   // this.$store.dispath("getCategoryList");
  //   this.getCategoryList();
  // },
  // 如果当前页面不是home页面就隐藏三级导航（也就是search页面的时候）
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // },

    //lodash中节流： _.throttle(renewToken, 300000, { 'trailing': false })
    // moveIn: function (index) {
    //   console.log(index);  // 测试鼠标移动过快后，是否可以正常打印对应的下标index
    //   this.currentIndex = index;
    // },
    moveIn: throttle(
      function (index) {
        this.currentIndex = index;
      },
      30,
      { trailing: false }
    ), // {'trailing': false},在刚触发时就执行，否则会有延迟执行

    // 点击类别事件回调
    toSearch(event) {
      //console.log(event);
      let data = event.target.dataset;
      let { categoryname, category1id, category2id, category3id } = data;
      // 如果点击的 categoryname 存在，说明点击的就是 a 标签
      if (categoryname) {
        // 创建一个对象保存 query参数 和 params参数 的值
        // name 的值是已知确定的
        let location = { name: "search" };
        // 注意data对象中打印的 categoryname 的值都是小写的形式，要赋值给 categoryName
        // categoryname是公共已知的参数，可保存在 query 参数中
        let query = { categoryName: categoryname };
        // 判断 id 是几级的，就显示几级对应的id,保存到query参数中,query参数收集完毕
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 将收集好的 query 参数保存到location对象中
        location.query = query;
        //点击类别的时候带的是query参数，我们得去看看原来有没有params参数，有的话也得带上
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
  },
  computed: {
    // ...mapState(['categoryList']) //错的  之前是对的
    // state.categoryList
    // state.home.categoryList
    // ...mapState() 展开的是调用mapState函数的返回值
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
    //...mapGetters(["categoryList1"]),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 46px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #ddd;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 666px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
