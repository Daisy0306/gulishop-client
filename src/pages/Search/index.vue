<template>
  <div>
    <TopNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 展示三级分类点击的面包屑添加功能 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 展示搜索框中输入内容添加到面包屑中 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 展示品牌内容到面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{(searchParams.trademark?searchParams.trademark:"").split(":")[1]}}
              <i
                @click="removeTrademark"
              >×</i>
            </li>
            <!-- 显示属性相关的值 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForAttrValue="searchForAttrValue"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:orderFlag === '1'}">
                  <a href="javascript:;" @click="changeOrder('1')">
                    综合
                    <i
                      class="iconfont"
                      :class="{icondown:orderType === 'desc',iconup:orderType === 'asc'}"
                      v-if="orderFlag === '1'"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:orderFlag === '2'}">
                  <a href="javascript:;" @click="changeOrder('2')">
                    价格
                    <i
                      class="iconfont"
                      :class="{iconup:orderType==='asc',icondown:orderType==='desc'}"
                      v-if="orderFlag==='2'"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 如果没有在search.js中用getters，这里v-for遍历的时候要用：in goodsListInfo.goodsList -->
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted">
                  <span>...</span>
                </li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div>
                <span>共10页&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // 用户初始化参数，里面放的是用户可能搜索的所有条件
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  // beforemount 中用来同步处理数据（参数）
  // 把路由当中的 keyword 还有相关的类别名称及类别id获取到，添加到 searchParams 搜索条件中
  // 如果有，那么搜索条件中就有了，如果没有，那就是初始化参数
  beforeMount() {
    // let { keyword } = this.$route.params;
    // let {
    //   categoryName,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    // } = this.$route.query;
    // // 这里的 searchParams 是新的局部变量，不是data中的
    // let searchParams = {
    //   ...this.searchParams,
    //   // 不管后面有没有。都解构出来，有就覆盖，没有就为 undefined
    //   keyword,
    //   categoryName,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    // };
    // // 优化性能：这个参数，如果传的是空串，就没必要
    // Object.keys(searchParams).forEach((item) => {
    //   if (searchParams[item] === "") {
    //     delete searchParams[item];
    //   }
    // });
    // this.searchParams = searchParams;
    this.handlerSearchParams();
  },
  //用封装函数的写法，不直接 dispath
  mounted() {
    this.getGoodsListInfo();
  },
  methods: {
    // 发送请求
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    // 处理请求参数
    handlerSearchParams() {
      let { keyword } = this.$route.params;
      let {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;
      // 这里的 searchParams 是新的局部变量，不是data中的
      let searchParams = {
        ...this.searchParams,
        // 不管后面有没有。都解构出来，有就覆盖，没有就为 undefined
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      };
      // 优化性能：这个参数，如果传的是空串，就没必要留着
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === "") {
          delete searchParams[item];
        }
      });
      this.searchParams = searchParams;
    },
    // 删除面包屑当中的类名请求参数
    removeCategoryName() {
      // 先输出面包屑当中的参数，再重新发送请求
      this.searchParams.categoryName = "";
      // this.getGoodsListInfo(); // 通过dispath只会发送请求不会改变路径
      // 必须通过 push 或者 replace 才能改变路径
      // 这里push可以发送请求是因为下面的watch进行了监视
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除面包屑当中的关键字请求参数
    removeKeyword() {
      this.$bus.$emit("clearKeyword");
      this.searchParams.keyword = "";
      this.$router.replace({ name: "search", query: this.$route.query });
    },
    searchForTrademark(trademark) {
      // 回调函数在谁当中，谁就是接收数据的
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getGoodsListInfo();
    },
    // 删除面包屑中的品牌参数
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getGoodsListInfo();
    },
    //使用自定义事件组件通信（子向父），达到根据属性值搜索
    searchForAttrValue(attr, attrValue) {
      //"属性ID:属性值:属性名"
      //要先去判断props当中是否已经存在这个点击的属性值条件，如果有了就不需要再去发请求
      // let isTrue = this.searchParams.props.some(item => item === `${attr.attrId}:${attrValue}:${attr.attrName}`)
      // if(isTrue) return

      let num = this.searchParams.props.indexOf(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      if (num !== -1) return;

      this.searchParams.props.push(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      this.getGoodsListInfo();
    },
    removeProp(index) {
      //删除某一个下标的属性值
      this.searchParams.props.splice(index, 1);
      this.getGoodsListInfo();
    },
    // 综合和价格排序切换规则
    changeOrder(orderFlag) {
      let originOrderFlag = this.searchParams.order.split(":")[0];
      let originOrderType = this.searchParams.order.split(":")[1];
      let newOrder = "";
      // 代表点击的还是原来排序的那个，只需要改变排序类型
      if (orderFlag === originOrderFlag) {
        newOrder = `${originOrderFlag}:${
          originOrderType === "desc" ? "asc" : "desc"
        }`;
      } else {
        // 点击的不是原来排序的那个，那么我们需要去改变排序的标志，类型是默认排序
        newOrder = `${orderFlag}:desc`;
      }
      // 重新改变排序方式
      this.searchParams.order = newOrder;
      // 重新发送请求
      this.getGoodsListInfo();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    // 模板内部排序表达式的优化处理
    orderFlag() {
      return this.searchParams.order.split(":")[0];
    },
    orderType() {
      return this.searchParams.order.split(":")[1];
    },
  },
  components: {
    SearchSelector,
  },
  // 解决search页面输入搜索参数或者不会发送请求的bug
  watch: {
    $route() {
      this.handlerSearchParams();
      this.getGoodsListInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>