<template>
  <div class="catalog container">
    <Sidebar/>
    <div>
      <h2 class="title">Catalog</h2>
      <div class="catalog-list">
        <CatalogItem
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
        />
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import CatalogItem from "@/components/CatalogItem";
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {
    CatalogItem,
    Sidebar
  },
  computed: {
    ...mapGetters('brands', ['filteredProducts']),
  },
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
}
</style>
