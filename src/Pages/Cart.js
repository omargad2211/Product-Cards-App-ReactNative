import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/cartSlice"; // Adjust the import path as needed
import dayjs from "dayjs";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Filter items added within the last 2 days
  const recentItems = cartItems.filter((item) =>
    dayjs(item.dateAdded).isAfter(dayjs().subtract(2, "day"))
  );

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item.id)}
        style={styles.deleteButton}
      >
        <AntDesign name="delete" size={24} color={"#FB5B21"} />
        {/* Adjust the path to your icon */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={recentItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.cartList}
      />
      {recentItems.length === 0 && (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FB5B21",
    marginBottom: 16,
    textAlign: "center",
  },
  cartList: {
    paddingBottom: 100, // Add some padding to avoid overlapping with any potential footer
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2, // For shadow effect on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#FB5B21",
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  emptyCartText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
