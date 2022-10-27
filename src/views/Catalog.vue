<template>
  <div class="catalog container">
    <Sidebar/>
    <div>
      <h2 class="title">Catalog</h2>
      <CatalogItem class="catalog-list"/>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import CatalogItem from "@/components/CatalogItem";

export default {
  name: 'Home',
  components: {
    CatalogItem,
    Sidebar
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
