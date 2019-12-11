var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "/pictures/green-socks.png",
    altText: "Green socks",
    linkContactUs: "https://goodday4u.com/",
    inStock: false,
    inventory: 3,
    details: ["80% cotton", "20% polyester", "Gender-neutral"]
  }
});
