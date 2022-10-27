<template>
  <div
      class="navbar container"
      :class="[isRouteCart ? 'navbar_center' : '']"
  >
    <router-link to="/">
      <img
          src="@/assets/images/logo.png"
          alt="Логотип"
          class="navbar_logo"
      >
    </router-link>
    <router-link
        to="/cart"
        v-if="!isRouteCart"
        class="navbar_cart"
    >
      <img
          src="@/assets/images/cart.png"
          alt="Корзина"
          class="navbar_cart-img"
      >
      <span
          v-if="cartItemsQty >= 1"
          class="navbar-counter"
      >
        {{ cartItemsQty }}
      </span>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters('cart', ["cartItemsQty"]),
    isRouteCart() {
      return (this.$route.name === 'Cart')
    }
  },

}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #000000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: darkgray;

  @include breakpoint(550px) {
    padding: 15px;
  }

  &_center {
    justify-content: center !important;
  }

  &_logo {
    width: 100px;

    @include breakpoint(600px) {
      width: 80px;
    }
  }

  &_cart {
    position: relative;

    &-img {
      width: 30px;

      @include breakpoint(700px) {
        width: 20px;
      }
    }
  }

  &-counter {
    position: absolute;
    bottom: 22px;
    left: 20px;
    background: sandybrown;
    height: 18px;
    width: 18px;
    text-align: center;
    border-radius: 10px;

    @include breakpoint(700px) {
      bottom: 14px;
      left: 15px;
      height: 15px;
      width: 15px;
      font-size: 13px;
    }
  }
}

</style>
