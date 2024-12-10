<template>
  <div class="p-4">
    <div class="flex max-sm:flex-col container align-middle justify-center">
      <div>
        <div>
          <img
            :src="getImgUrl(product.product_img)"
            alt="Product Image"
            class="object-cover w-[800px] h-[600px] max-sm:w-[500px] max-sm:h-[300px]"
          />
        </div>
      </div>
      <div>
        <div class="max-sm:pt-2 p-6">
          <div class="flex justify-between">
            <p class="text-sm text-gray-500 mb-4 max-sm:text-xs max-sm:mb-0">
              Code: {{ product.sku }}
            </p>
            <p class="text-sm text-gray-500 mb-4 max-sm:text-xs max-sm:mb-0">
              status
            </p>
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2 max-sm:text-sm">
            {{ product.name }}
          </h1>

          <p class="text-sm text-gray-500 mb-4 max-sm:text-xs max-sm:mb-0">
            Factory Part #: {{ product.factory_part_num }}
          </p>
          <p class="text-xl text-gray-700 font-bold max-sm:text-sm">
            {{ changeMonetaryFormat(product.price) }}
          </p>

          <div class="justify-between flex align-middle mt-5 max-sm:mt-2">
            <button
              class="w-[500px] hover:bg-yellow-500 text-white py-2 bg-yellow-600 px-4 rounded-lg border border-orange-500 hover:text-white hover:border-white max-sm:text-sm text-1xl"
            >
              Order Now
            </button>
            <button>
              <i
                class="pi pi-shopping-cart py-2 pl-2 text-4xl max-sm:text-3xl"
              ></i>
            </button>
            <button>
              <i class="pi pi-heart py-2 px-2 text-4xl max-sm:text-3xl"></i>
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
      this.fetchProduct(); // Re-fetch product data
    }
    next();
  },
};
</script>
