<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-bold flex-1">Search Results</h1>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name"
        class="border rounded-lg py-2 px-4 w-64"
      />
      <button
        @click="performSearch"
        class="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    <div v-if="loading" class="text-center my-8">
      <p>Loading...</p>
    </div>

    <div v-if="products.length === 0 && !loading" class="text-center my-8">
      <p>No products found for "{{ searchQuery }}"</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md p-4 cursor-pointer"
        @click="navigateToProduct(product.id)"
      >
        <img
          :src="getImgUrl(product.product_img)"
          alt="Product Image"
          class="w-full h-48 object-cover mb-4"
        />
        <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
        <p class="text-sm text-gray-500 mb-2">Code: {{ product.sku }}</p>
        <p class="text-lg text-gray-700 font-bold">
          {{ changeMonetaryFormat(product.price) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      products: [],
      loading: false,
    };
  },
  watch: {
    // Watch for route query changes and trigger a new search
    "$route.query.q": "fetchSearchResults",
  },
  methods: {
    performSearch() {
      // Update the route query with the new search term
      this.$router.push({ name: "search", query: { q: this.searchQuery } });
    },
    fetchSearchResults() {
      this.searchQuery = this.$route.query.q || "";
      if (!this.searchQuery.trim()) {
        this.products = [];
        return;
      }

      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/products/search`, {
          params: { q: this.searchQuery },
        })
        .then((response) => {
          if (response.status === 200) {
            this.products = response.data;
          }
        })
        .catch(() => {
          this.products = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    navigateToProduct(id) {
      this.$router.push({ name: "SelectedProduct", params: { id } });
    },
    getImgUrl(imagePath) {
      return process.env.VUE_APP_BASE_URL + "/products/get_img/" + imagePath;
    },
    changeMonetaryFormat(value) {
      if (value === null || value === undefined) {
        return "₽";
      }
      return Number(value).toFixed(2);
    },
  },
  mounted() {
    this.fetchSearchResults();
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
