var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "/pictures/green-socks.png",
    altText: "Socks",
    linkContactUs: "https://goodday4u.com/",
    inStock: true,
    inventory: 3,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "/pictures/green-socks.png"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "/pictures/blue-socks.png"
      }
    ],
    cart: 0
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
    displayImage(variantImage) {
      this.image = variantImage;
    }
  }
});
