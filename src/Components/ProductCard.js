import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice"; // Adjust the path as needed

export default function ProductCard({
  productName,
  productDescription,
  productPrice,
  image,
  productId,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart); // Access cart items from Redux state

  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item.id === productId);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productId,
        title: productName,
        price: productPrice,
        image,
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>{productName}</Text>

      {/* Body */}
      <Image
        source={{ uri: image }} // Ensure the image source is set correctly
        style={styles.productImage}
      />
      <Text style={styles.description}>{productDescription}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>${productPrice}</Text>
        <TouchableOpacity
          style={[styles.buyButton, isInCart && styles.addedButton]} // Change button style if in cart
          onPress={handleAddToCart}
          disabled={isInCart} // Disable button if already in cart
        >
          <Text style={styles.buyButtonText}>
            {isInCart ? "Added to cart" : "Add to cart"}{" "}
            {/* Change button text */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "green",
  },
  productImage: {
    height: 190,
    width: "100%",
    borderRadius: 15,
    marginVertical: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    color: "green",
    fontWeight: "600",
  },
  buyButton: {
    backgroundColor: "#FB5B21",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addedButton: {
    backgroundColor: "#A5D6A7", // New background color for "Added to cart" state
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
