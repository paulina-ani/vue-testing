var eventBus = new Vue();

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
        <p :class="{outOfStock: !inStock}">On Sale!</p>
        <p :class="{outOfStock: inStock}">Out of stock</p>
        <p>{{ sale }}</p>
        <product-details :details="details"></product-details>
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
      <div>
        <product-tabs :reviews="reviews"></product-tabs>
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
          variantImage: "./pictures/green-socks.png",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./pictures/blue-socks.png",
          variantQuantity: 20
        }
      ],
      cart: 0,
      onSale: true,
      reviews: []
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
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
  },
  mounted() {
    eventBus.$on("review-form", productForm => {
      this.reviews.push(productForm);
    });
  }
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    Details:
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  </div>
  `
});

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">Please correct following error(s):</p>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <b>Do you reccomend this product?</b>
        <input 
        type="radio" 
        v-model="reccomend" 
        name="reccomend"
        value="Yes">
          Yes
        </input>

        <input 
        type="radio" 
        v-model="reccomend" 
        name="reccomend"
        value="No">
          No
        </input>
      </p>

      <p>
        <input type="submit" value="Submit">  
      </p>    
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      reccomend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating) {
        let productForm = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          reccomend: this.reccomend
        };
        eventBus.$emit("review-form", productForm);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.reccomend = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.reccomend) this.errors.push("reccomendation option required");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>
      <span class="tab" v-for="(tab, index) in tabs"
      :key="index"
      @click="selectedTab = tab"
      :class="{activeTab: selectedTab === tab}"
      > {{ tab }}</span>

      <div v-show="selectedTab === 'Review'">
        <p v-show="!reviews.length">There are no reviews yet</p>
        <ul v-for="(review, index) in reviews" :key="index">
          <li>Name: {{ review.name }}</li>
          <li>Review: {{ review.review }}</li>
          <li>Rating: {{ review.rating }}</li>
          <li>Reccomend: {{ review.reccomend }}</li>
        </ul>
        </div>
        <div v-show="selectedTab === 'Make a review'">
          <product-review></product-review>
        </div>
    </div>
  `,
  data() {
    return {
      tabs: ["Review", "Make a review"],
      selectedTab: "Review"
    };
  }
});
var app = new Vue({
  el: "#app",
  data: {
    linkContactUs: "https://goodday4u.com/",
    premium: false,
    cart: []
  },
  methods: {
    addItem(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      this.cart.pop(id);
    }
  }
});
