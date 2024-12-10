<template>
  <div class="p-4">
    <div class="flex container align-middle justify-center">
      <div>
        <div>
          <img
            :src="getImgUrl(product.product_img)"
            alt="Product Image"
            class="w-full h-64 object-cover"
          />
        </div>
      </div>
      <div>
        <div class="p-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            {{ product.name }}
          </h1>
          <p class="text-sm text-gray-500 mb-4">Code: {{ product.sku }}</p>
          <p class="text-sm text-gray-500 mb-4">
            Factory Part #: {{ product.factory_part_num }}
          </p>
          <p class="text-xl text-gray-700 font-bold">
            {{ changeMonetaryFormat(product.price) }}
          </p>
          <p class="text-gray-600 mt-4">
            {{ product.description || "No description available." }}
          </p>
          <div class="justify-between flex p-2 align-middle">
            <button
              class="w-[400px] hover:bg-yellow-600 text-black py-2 px-4 rounded-lg border border-black-500 hover:text-white hover:border-white"
            >
              Order Now
            </button>
            <button>
              <i class="pi pi-shopping-cart py-2 px-4 text-4xl"></i>
            </button>
            <button>
              <i class="pi pi-heart py-2 px-4 text-4xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductList />
</template>

<script>
import axios from "axios";
import ProductList from "./ListProductView.vue";

export default {
  props: ["id"],
  data() {
    return {
      product: {},
      productId: this.id,
    };
  },
  components: {
    ProductList,
  },
  methods: {
    fetchProduct() {
      // Replace this with your actual API endpoint
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/products/find/${this.productId}`)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    },
    changeMonetaryFormat(value) {
      return value ? Number(value).toFixed(2) : "₽";
    },
    getImgUrl(imagePath) {
      return process.env.VUE_APP_BASE_URL + "/user_menu/get_img/" + imagePath;
    },
    goBack() {
      this.$router.back();
    },
  },
  mounted() {
    this.fetchProduct();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== this.productId) {
      this.productId = to.params.id;
      this.fetchProduct();
    }
    next();
  },
};
</script>
