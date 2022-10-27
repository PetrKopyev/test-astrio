<template>
  <div class="sidebar">
    <div class="sidebar-block">
      <h3
          @click="clearSelectedBrand"
          class="sidebar-title sidebar-link"
      >
        All Brands
      </h3>

      <div class="sidebar-brands">
        <div
            class="sidebar-brands_item sidebar-link"
            v-for="brand in brands"
            :key="brand.id"
        >
          <span
              @click="pickedBrand(brand)"
              :class="{'activeBrand' : selectedBrand === brand}"
          >
            {{ brand.title }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState('brands', ['brands', 'selectedBrand']),
  },
  methods: {
    ...mapActions('brands', ['setSelectedBrand', 'clearSelectedBrand']),
    pickedBrand(brand) {
      this.setSelectedBrand(brand)
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  width: max-content;
  margin-right: 10px;
  cursor: pointer;
  font-size: 2vw;

  @include breakpoint(550px) {
    font-size: 3vw;
  }

  &-link {
    cursor: pointer;

    &:hover,
    &:active {
      text-decoration: underline;
      font-weight: bold;
    }
  }

  &-block {
    border-right: 3px solid #000000;
  }

  &-title {
    margin-bottom: 10px;
    width: max-content;
    margin-right: 5px;
  }

  &-brands {
    display: flex;
    flex-direction: column;

    &_item {
      margin-bottom: 3px;
    }
  }
}

.activeBrand {
  text-decoration: underline;
  font-weight: bold;
}

</style>
