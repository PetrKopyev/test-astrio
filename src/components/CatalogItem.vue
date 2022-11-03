<template>
  <div>
    <div class="catalog-item">
      <div v-if="product.color">
        <img
            :src="require(`@/assets${product.img}`)"
            :alt="product.title"
            class="catalog-item_img"
        >
      </div>

      <div v-else>
        <img
            :src="require(`@/assets${product.image}`)"
            :alt="product.title"
            class="catalog-item_img"
        >
      </div>
      <h3>{{ product.title }}</h3>
      <span>Brand {{ product.brand }}</span>
      <span>{{ currency(product.regular_price.currency) }}{{ product.regular_price.value }}</span>

      <div v-if="product.type === 'configurable'">
        <div
            v-if="product.colors"
            class="catalog-colors"
        >
          <div
              v-for="color in product.colors"
              :key="color.value_index"
              :style="{ backgroundColor: color.value}"
              class="catalog-colors_item"
              @click="pickedColor(color, product)"
              :class="{active: isActiveColor(color, product)}"
          ></div>
        </div>

        <div
            v-else
            class="catalog-colors"
        >
          <div
              v-for="color in product.configurable_options[0].values"
              :key="color.value_index"
              :style="{ backgroundColor: color.value}"
              class="catalog-colors_item"
              @click="pickedColor(color, product)"
              :class="{active: isActiveColor(color, product)}"
          ></div>
        </div>
      </div>

      <div v-if="product.type === 'configurable'">
        <div
            v-if="product.colorId"
            class="catalog-sizes"
        >
          <div
              class="catalog-sizes_item"
              v-for="size in product.sizes"
              :key="size.value_index"
              @click="pickedSize(size, product)"
              :class="{active: isActiveSize(size, product)}"
          >
            {{ size.label }}
          </div>
        </div>

        <div
            v-else
            class="catalog-sizes"
        >
          <div
              class="catalog-sizes_item"
              v-for="size in product.configurable_options[1]?.values"
              :key="size.value_index"
              @click="pickedSize(size, product)"
              :class="{active: isActiveSize(size, product)}"
          >
            {{ size.label }}
          </div>
        </div>
      </div>

      <button
          class="catalog-button"
          :disabled="disabled(product)"
          @click="addToItems(product)"
      >
        <i class="el-icon-circle-plus-outline"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {currency, pickedItem} from "@/functions";
import {mapActions} from "vuex";

export default {
  name: "CatalogItem",
  data() {
    return {
      currency: currency,
    }
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    ...mapActions('cart', ['addToItems']),
    disabled(product) {
      if (product.type !== 'configurable') {
        return false
      } else if (product.type === 'configurable' && product.color && product.size) {
        return false
      } else {
        return true
      }
    },

    pickedSize(size, product) {
      this.$set(product, 'size', size.label)
      product.sizeId = size.value_index

      let colors = pickedItem(1, 0, size, product)
      this.$set(product, 'colors', colors)
    },

    isActiveSize(size, product) {
      return size.label === product.size
    },

    pickedColor(color, product) {
      this.$set(product, 'color', color.label)
      product.colorId = color.value_index

      let sizes = pickedItem(0, 1, color, product)
      this.$set(product, 'sizes', sizes)

      this.changeImageIfPickedColor(product)
    },

    isActiveColor(color, product) {
      return color.value_index === product.colorId
    },

    changeImageIfPickedColor(product) {
      product.variants.forEach(item => {
        if (product.colorId === item.attributes[0].value_index) {
          product.img = item.product.image
        }
      })
    },
  }
}
</script>

<style lang="scss">
.catalog {
  &-item {
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 15px;
    border-radius: 10px;
    height: 100%;

    & h3 {
      font-size: 2vw;
      @include breakpoint(550px) {
        font-size: 3vw;
      }
    }

    & span {
      margin-top: 5px;
      font-size: 2vw;

      @include breakpoint(550px) {
        font-size: 3vw;
      }
    }
  }

  &-colors {
    display: flex;
    flex-direction: row;
    margin: 5px 0;

    &_item {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: 1px solid #000000;
      margin-right: 5px;

      &:hover {
        border: 1px solid sandybrown;
      }
    }
  }

  &-sizes {
    display: flex;
    flex-direction: row;

    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 22px;
      border: 2px solid #000000;
      cursor: pointer;

      &:last-child {
        margin-left: 10px;
      }
    }
  }

  &-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    border: none;
    background: #ffffff;

    & > .el-icon-circle-plus-outline:before {
      font-size: 45px;

      @include breakpoint(600px) {
        font-size: 35px;
      }
    }
  }
}

.title {
  margin-bottom: 20px;

  @include breakpoint(600px) {
    font-size: 4vw;
  }
}

.active {
  border: 1px solid sandybrown;
}
</style>
