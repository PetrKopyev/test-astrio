<template>
  <div
      class="catalog container"
  >
    <Sidebar/>
    <div class="catalog-block">
      <h2 class="title">Catalog</h2>
      <div class="catalog-list">
        <div
            class="catalog-item"
            v-for="product in filteredProducts"
            :key="product.id"
        >
          <div
              v-if="product.color"
          >
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
          <div
              class="catalog-colors"
              v-if="product.type === 'configurable'"
          >
            <div
                v-for="color in product.configurable_options[0].values"
                :key="color.value_index"
                :style="{ backgroundColor: color.value}"
                class="catalog-colors_item"
                @click="sizesWithColor(color, product)"
            ></div>
          </div>
          <div v-if="product.type === 'configurable'">
            <div v-if="product.colorId" class="catalog-sizes">
              <div
                  class="catalog-sizes_item"
                  v-for="size in product.sizes"
                  :key="size.value_index"
                  @click="pickedSize(size, product)"
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
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import {mapActions, mapGetters} from 'vuex'
import {currency} from '@/functions'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  data() {
    return {
      currency: currency,
    }
  },
  computed: {
    ...mapGetters('brands', ['filteredProducts']),
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
    },
    sizesWithColor(color, product) {
      let colorName = ''
      switch (color.value_index) {
        case 931:
          colorName = 'red'
          break
        case 932:
          colorName = 'blue'
          break
        case 933:
          colorName = 'black'
          break
      }
      this.$set(product, 'color', colorName)
      product.colorId = color.value_index
      let sizes = []
      product.variants.forEach(item => {
        if (product.colorId === item.attributes[0].value_index) {
          sizes.push(item.attributes[1].value_index)
        }
      })
      let sizeObjects = sizes.map(item => {
        for (let i = 0; i < product.configurable_options[1].values.length; i++) {
          if (item === product.configurable_options[1].values[i].value_index) {
            return item = product.configurable_options[1].values[i]
          }
        }
      })
      this.$set(product, 'sizes', sizeObjects)
      this.imageWithColor(product)
    },
    imageWithColor(product) {
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
  display: flex;
  flex-direction: row;
  margin: 100px 20px 40px 20px;

  @include breakpoint(700px) {
    margin: 80px 10px 40px 10px;
  }

  &-list {
    display: grid;
    justify-items: center;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: space-between;

    @include breakpoint(800px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @include breakpoint(550px) {
      grid-template-columns: 1fr 1fr;
    }
    @include breakpoint(410px) {
      grid-template-columns: 1fr;
    }
  }

  &-item {
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 15px;
    border-radius: 10px;

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

</style>
