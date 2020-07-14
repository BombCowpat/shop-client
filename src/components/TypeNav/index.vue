<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOut" @mouseenter="moveIn1">
        <h2 class="all">全部商品分类</h2>
        <!-- nav -->

        <transition name="fade">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch($event)">
              <div
                class="item"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveIn(index)"
                :class="{item_on:currentIndex === index}"
              >
                <h3>
                  <!-- <router-link
                :to="{name:'search',query:{categoryName:c1.categoryName,categoryId:c1.categoryId}}"
                  >{{c1.categoryName}}</router-link>-->
                  <!-- <a href="javascript:;" @click="toSearch({name:'search',query:{categoryName:c1.categoryName,categoryId:c1.categoryId}})">{{c1.categoryName}}</a> -->
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <router-link
                      :to="{name:'search',query:{categoryName:c2.categoryName,categoryId:c2.categoryId}}"
                        >{{c2.categoryName}}</router-link>-->
                        <!-- <a href="javascript:;" @click="toSearch({name:'search',query:{categoryName:c2.categoryName,categoryId:c2.categoryId}})">{{c2.categoryName}}</a> -->
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link
                        :to="{name:'search',query:{categoryName:c3.categoryName,categoryId:c3.categoryId}}"
                          >{{c3.categoryName}}</router-link>-->

                          <!-- <a href="javascript:;" @click="$router.push({name:'search',query:{categoryName:c3.categoryName,categoryId:c3.categoryId}})">{{c3.categoryName}}</a> -->
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
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
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  /*   mounted() {
    this.getCategoryList();
  }, */
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  data() {
    return {
      currentIndex: -1,
      isShow: true
    };
  },
  methods: {
    /*     getCategoryList() {
      this.$store.dispatch("getCategoryList");
    }, */

    toSearch(event) {
      let data = event.target.dataset;
      let { categoryname, category1id, category2id, category3id } = data;
      // console.log(data)
      // console.log(categoryname, category1id, category2id, category3id);
      if (categoryname) {
        let location = {
          name: "search"
        };
        let query = {
          categoryName: categoryname
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;

        let {params} = this.$route
        if(params){
          location.params = params
        }
        // console.log(location);
        this.$router.push(location);
      }
      // console.log(location)
    },

    /*     moveIn(index){
      console.log(index)
      this.currentIndex = index
    }, */
    moveIn: throttle(
      function(index) {
        // console.log(index);
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),
    moveOut() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    moveIn1() {
      this.isShow = true;
    }
  },
  computed: {
    /*       categoryList(){
          return this.$store.state.home.categoryList
      } */

    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
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

    //
    .fade-enter-active {
      transition: opacity 0.5s;
    }
    .fade-leave-active {
      // transition: opacity 0.5s;
      opacity: 0;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

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
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
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
                  width: 650px;
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
            background-color: #aaa;
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