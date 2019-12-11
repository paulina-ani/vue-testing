var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    altText: "Socks",
    linkContactUs: "https://goodday4u.com/",
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
    }
  }
});
