<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(goods, index) in shopCartList" :key="goods.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="goods.isChecked"
              @click="updateOneIsChecked(goods)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="goods.imgUrl" />
            <div class="item-msg">{{goods.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{goods.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateCartNum(goods,-1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="goods.skuNum"
              minnum="1"
              class="itxt"
              @change="updateCartNum(goods,$event.target.value*1)"
            />
            <a href="javascript:void(0)" class="plus" @click="updateCartNum(goods,+1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{goods.skuNum*goods.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteGoods(goods)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{checkedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    //修改购物车商品数量
    async updateCartNum(goods, changeNum) {
      //changeNum 改变的数量
      if (goods.skuNum + changeNum < 1) {
        changeNum = 1 - goods.skuNum;
      }
      try {
        const result = await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: goods.skuId,
          skuNum: changeNum
        });
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改单个购物车选中信息
    async updateOneIsChecked(goods) {
      try {
        await this.$store.dispatch("updateIsChecked", {
          skuId: goods.skuId,
          isChecked: goods.isChecked === 1 ? 0 : 1
        });
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    // delete
    async deleteGoods(goods) {
      try {
        await this.$store.dispatch("deleteGoods", goods.skuId);
        this.getShopCartList();
      } catch (error) {
        alert(error);
      }
    },
    //deleteChecked
    async deleteChecked() {
      try {
        await this.$store.dispatch("deleteCheckedGoods");
        this.getShopCartList()
      } catch (error) {
        alert(error.message);
      }
    }
  },
  computed: {
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    checkedNum() {
      return this.shopCartList.reduce((pre, item, index) => {
        if (item.isChecked) {
          pre += item.skuNum;
        }
        return pre;
      }, 0);
    },
    allMoney() {
      return this.shopCartList.reduce((pre, item, index) => {
        if (item.isChecked) {
          pre += item.skuNum * item.skuPrice;
          return pre;
        }
      }, 0);
    },
    isAllChecked: {
      get() {
        return this.shopCartList.every((item, index) => item.isChecked) && this.shopCartList.length>0;
      },
      async set(val) {
        try {
          const result = await this.$store.dispatch(
            "updateAllIsChecked",
            val ? 1 : 0
          );
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>