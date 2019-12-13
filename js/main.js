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
<<<<<<< HEAD
      <div class="form-button">
          <div class="button-container">
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
        </div>
        <product-tabs  :reviews="reviews"></product-tabs>
=======
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
>>>>>>> parent of 36af5bc... Cart button modified
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
      onSale: true,
      reviews: []
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
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
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
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors"> {{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review" placeholder="review"></textarea>
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
      <div>
        <b>Would you reccoment this product?</b>
        <div class="radio-container">
          <input type="radio" name="reccomend" v-model="reccomend" value="Yes">Yes</input>
          <input type="radio" name="reccomend" v-model="reccomend" value="No">No</input>
        </div>
      </div>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      id: 1,
      name: null,
      review: null,
      rating: null,
      reccomend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          reccomend: this.reccomend
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.reccomend = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.reccomend) this.errors.push("Reccomendation field required");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <div>
        <span class="tab" 
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="selectedTab = tab"
        :class="{activeTab: selectedTab === tab }"
        >{{ tab }}</span>
      </div>
      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet</p>
        <ul v-for="review in reviews">
          <li> Name: {{review.name}}</li>
          <li> Rating: {{review.rating}}</li>
          <li> Review: {{review.review}}</li>
          <li> Reccomendation: {{ review.reccomend }} </li>
        </ul>
      </div>
      <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>

    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Review"
    };
  }
});

var app = new Vue({
  el: "#app",
  data: {
    linkContactUs: "https://goodday4u.com/",
    premium: false
  }
});
