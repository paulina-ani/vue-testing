Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p>User is premium: {{ premium }}</p>
        <p>Cost: {{ shipping }}</p>
        <p :class="{outOfStock: inStock}">On Sale!</p>
        <p :class="{outOfStock: !inStock}">Out of stock</p>
        <p>{{ sale }}</p>
        <div>
          Details:
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
        <div>
          Available colors:
          <p
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)"
          ></p>
        </div>
        <div>
          Sizes:
          <ul>
            <li v-for="size in sizes">{{ size }}</li>
          </ul>
        </div>
      </div>
      <button
        @click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Add to Cart
      </button>
      <button
        @click="removeFromCart"
        :disable="!inStock"
        :class="{disabledButton: !inStock}"
      >
        Remove from Cart
      </button>
      <div class="cart">
        <p>Cart ({{ cart }})</p>
      </div>
    </div>
  `,
  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      description: "A pair of warm, fuzzy socks",
      altText: "Socks",
      inventory: 3,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      sizes: ["XS", "S", "M", "L", "XL"],
      selectedVariant: 0,
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "/pictures/green-socks.png",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "/pictures/blue-socks.png",
          variantQuantity: 0
        }
      ],
      cart: 0,
      onSale: true
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart) {
        this.cart -= 1;
      }
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.variants[this.selectedVariant].variantQuantity) {
        return this.brand + " " + this.product + " is on sale";
      } else {
        return this.brand + " " + this.product + " is not on sale";
      }
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    linkContactUs: "https://goodday4u.com/",
    premium: false
  }
});
