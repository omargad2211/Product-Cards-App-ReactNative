import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice";
import Header from "../Components/common/Header";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Category from "../Components/Home/Category";
import ProductCard from "../Components/Home/ProductCard";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const hasMore = useSelector((state) => state.products.hasMore);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1); // Track current page
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state for more products

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts({ page, limit: 10 }));
    }
  }, [dispatch, productStatus, page]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard
        productId={item.id}
        productName={item.title}
        productDescription={item.description}
        productPrice={item.price}
        image={item.images[0]}
      />
    ),
    []
  );

  const getItemLayout = useCallback(
    (data, index) => ({ length: 20, offset: 20 * index, index }),
    []
  );

 const loadMoreProducts = () => {
   if (hasMore && !loadingMore) {
     setLoadingMore(true);
     const nextPage = page + 1; // Calculate the next page
     setPage(nextPage); // Set the next page
     dispatch(fetchProducts({ page: nextPage, limit: 10 })).then(() => {
       setLoadingMore(false);
     });
   }
 };

  return (
    <View style={styles.container}>
      <Header title="Products" />
      <Text style={styles.headertitle}>Find Your Dreams</Text>
      <SearchContainer />
      <CategoriesContainer
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList
        style={{ marginHorizontal: 20 }}
        numColumns={2}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.productList}
        onEndReached={loadMoreProducts} // Trigger load more when scrolled to the end
        onEndReachedThreshold={0.5} // Trigger when half the items are visible
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="green" />
          ) : null
        } // Show loading indicator
      />
    </View>
  );
};

const SearchContainer = () => (
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

const CategoriesContainer = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headertitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "green",
    marginVertical: 15,
    textAlign: "center",
    letterSpacing: 1,
  },
  searchContainer: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
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
