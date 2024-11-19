import { createAppAsyncThunk } from "../app/withTypes";
import { RootState } from "../app/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Reactions {
  heart: boolean;
}

export type ReactionName = keyof Reactions;

export interface Product {
  id: string;
  image: string;
  name: string;
  desc: string;
  cuisine: string;
  calories: string;
  reactions: Reactions;
  servings: string;
}

const initReactions: Reactions = {
  heart: false,
};

interface ProductState {
  products: Product[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  favor: boolean;
}

interface servData {
  name: string;
  image: string;
  instructions: Array<String>;
  cuisine: string;
  caloriesPerServing: string;
  servings: string;
}

const formProducts = (data: Array<servData>): Product[] => {
  let products: Array<Product> = [];
  for (let elem of data) {
    let { name, image, instructions, cuisine, caloriesPerServing, servings } =
      elem;
    let desc = instructions.join(" ");
    let reactions: Reactions = { heart: false };

    let product: Product = {
      id: nanoid(),
      name: name,
      image: image,
      desc: desc,
      cuisine: cuisine,
      calories: caloriesPerServing.toString(),
      servings,
      reactions: reactions,
    };
    products.push(product);
  }
  return products;
};

export const fetchProducts = createAppAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response: Response = await window.fetch(
      "https://dummyjson.com/recipes/?delay=1000&limit=4&skip=6&select=name,instructions,cuisine,caloriesPerServing,image,servings"
    );
    let data = await response.json();

    let products;
    if (response.ok) {
      products = formProducts(data.recipes);
      return products;
    }
    throw new Error(response.statusText);
  },
  {
    condition(arg, thunkApi) {
      const productsStatus = selectProductsStatus(thunkApi.getState());
      if (productsStatus !== "idle") {
        return false;
      }
    },
  }
);

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
  favor: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action: PayloadAction<Product>) {
        // state.products.push(action.payload);
        state.products.unshift(action.payload);
      },
      prepare(
        name: string,
        image: string,
        desc: string,
        cuisine: string,
        calories: string,
        servings: string
      ) {
        return {
          payload: {
            id: nanoid(),
            name,
            image,
            desc,
            cuisine,
            calories,
            servings,
            reactions: initReactions,
          },
        };
      },
    },
    productUpdated(state, action: PayloadAction<Product>) {
      const { id, image, name, desc, cuisine, calories, servings } =
        action.payload;
      const desiredProduct = state.products.find(
        (product) => product.id === id
      );
      if (desiredProduct) {
        desiredProduct.name = name;
        desiredProduct.image = image;
        desiredProduct.desc = desc;
        desiredProduct.cuisine = cuisine;
        desiredProduct.calories = calories;
        desiredProduct.servings = servings;
      }
    },
    productDeleted(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    favoritesClicked(state, action: PayloadAction<{ favor: boolean }>) {
      const { favor } = action.payload;
      state.favor = favor;
    },
    reactionCLicked(
      state,
      action: PayloadAction<{ productId: string; reaction: ReactionName }>
    ) {
      const { productId, reaction } = action.payload;
      const currentProduct = state.products.find(
        (product) => product.id === productId
      );
      if (currentProduct) {
        currentProduct.reactions[reaction] =
          !currentProduct.reactions[reaction];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(...(<[]>action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "unknown error";
      });
  },
});

export const {
  productAdded,
  productUpdated,
  productDeleted,
  reactionCLicked,
  favoritesClicked,
} = productsSlice.actions;
export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectProductById = (state: RootState, productId: string) => {
  return state.products.products.find((product) => product.id === productId);
};
export const selectFavorStatus = (state: RootState) => state.products.favor;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
