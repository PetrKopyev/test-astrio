<template>
  <div
      class="cart"
  >
    <h2 class="title">Shopping Cart</h2>
    <div v-if="TotalPositions > 0">
      <table>
        <thead>
        <tr>
          <th>Item</th>
          <th></th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="item in cart"
            :key="item.id"
        >
          <td>
            <div class="item">
              <img
                  :src="require(`@/assets${item.img ? item.img : item.image}`)"
                  :alt="item.title"
                  class="item-image"
              >
              <div class="item-info">
                <span>Brand {{ item.brand }}</span>
                <span>{{ item.title }}</span>
                <span class="item-info_small" v-if="item.color">Color: {{ item.color }}</span>
                <span class="item-info_small" v-if="item.size">Size: {{ item.size }}</span>
              </div>
            </div>
          </td>
          <td></td>

          <td>
            {{ currency(item.regular_price.currency) }}{{ item.regular_price.value }}
          </td>

          <td>
            <el-input-number
                size="mini"
                v-model="item.qt"
                controls-position="right"
                @change="changeQt()"
                :min="1"
            ></el-input-number>
          </td>
          <td>
            <span class="total">
              {{ currency(item.regular_price.currency) }}{{ total(item) }}
            </span>
          </td>
          <td>
            <el-button
                size="mini"
                @click.prevent="removeItem(item.id)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </td>
        </tr>
        </tbody>

      </table>
      <div class="cart-footer">
        <h2>Subtotal: {{ ifDollars ? '$' : '' }}{{ Total.toFixed(2) }}</h2>
        <button @click="submit">Checkout</button>
      </div>
    </div>
    <p
        v-else
        class="cart-empty"
    >
      Сart is empty!
      <br>
      Click on the logo to return to the list of products.
    </p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {currency} from '@/functions'

export default {
  name: 'Cart',
  data() {
    return {
      currency: currency
    }
  },
  methods: {
    ...mapActions('cart', ["removeItem", "changeQt"]),
    total(item) {
      return (item.qt * item.regular_price?.value).toFixed(2)
    },
    ifDollars() {
      return this.cart.every(item => item.regular_price?.currency === 'USD')
    },
    submit() {
      alert('А какой здесь должен быть функционал?)')
    }
  },
  computed: {
    ...mapGetters('cart', ["cart", "TotalPositions", "Total"]),
  },
}
</script>

<style lang="scss">
.cart {
  margin: 80px 20px 20px;

  @include breakpoint(600px) {
    margin: 80px 5px 5px;
  }

  &-empty {
    display: flex;
    justify-content: center;
    margin-top: 70px;
    font-size: 40px;
    color: sandybrown;
    text-align: center;
  }

  &-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include breakpoint(600px) {
      font-size: 12px;
    }

    & button {
      padding: 10px 40px;
      margin-top: 20px;
      font-weight: bold;

      @include breakpoint(600px) {
        margin-top: 10px;
        padding: 10px 20px;
      }
    }
  }


  & table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    & thead th:nth-child(2) {
      width: 20%;

      @include breakpoint(855px) {
        width: 0;
      }
    }

    & tbody tr {
      border-bottom: 1px solid #000000;
    }

    & th, td {
      padding: 20px;

      @include breakpoint(735px) {
        padding: 5px;
      }
    }

    & th {
      font-size: 20px;

      @include breakpoint(600px) {
        font-size: 15px;
      }
    }

    & td {
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      @include breakpoint(600px) {
        font-size: 12px;
      }
    }
  }

}

.item {
  display: flex;
  flex-direction: row;

  @include breakpoint(390px) {
    flex-direction: column;
    align-items: center;
  }


  & span {
    margin-bottom: 5px;
  }

  &-image {
    width: 140px;
    margin-right: 15px;

    @include breakpoint(600px) {
      width: 100px;
      margin-right: 5px;
    }

    @include breakpoint(465px) {
      width: 60px;
      margin-right: 5px;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @include breakpoint(600px) {
      align-self: center;
    }
    @include breakpoint(390px) {
      align-items: center;
    }


    &_small {
      font-size: 12px;
    }
  }
}

.el-input-number--mini {
  width: 87px;

  @include breakpoint(600px) {
    width: 60px;
  }
}

.el-input-number.is-controls-right .el-input__inner {
  @include breakpoint(600px) {
    padding-right: 35px;
  }
}

</style>
