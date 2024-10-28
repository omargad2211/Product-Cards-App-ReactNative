import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice"; // Adjust the path as needed
import Header from "../Components/Header";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Category from "../Components/Category";
import ProductCard from "../Components/ProductCard";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  // Extract unique categories from the products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Header title="Products" />
      <Text style={styles.headertitle}>Match Your Style</Text>
      <SearchContainer />
      <CategoriesContainer
        categories={categories} // Pass the dynamic categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList
        numColumns={2}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            productId={item.id}
            productName={item.title}
            productDescription={item.description}
            productPrice={item.price}
            image={item.images[0]}
          />
        )}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

function SearchContainer() {
  return (
    <View style={styles.searchContainer}>
      <EvilIcons
        name="search"
        size={26}
        color="#a0a0a0"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products"
        placeholderTextColor="#a0a0a0"
      />
    </View>
  );
}

function CategoriesContainer({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Category
            categoryItem={item}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headertitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "green",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  searchContainer: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 10,
    outlineColor: "transparent",
  },
  searchIcon: {
    marginRight: 10,
  },
  productList: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
