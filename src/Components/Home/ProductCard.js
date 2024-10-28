import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";

export default function ProductCard({
  productName,
  productDescription,
  productPrice,
  image,
  productId,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

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
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={styles.description} numberOfLines={3}>
        {productDescription}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>${productPrice}</Text>
        <TouchableOpacity
          style={[styles.buyButton, isInCart && styles.addedButton]}
          onPress={handleAddToCart}
          disabled={isInCart}
        >
          <Text style={styles.buyButtonText}>
            {isInCart ? "Added to cart" : "Add to cart"}{" "}
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
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#fff",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
    elevation: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "green",
  },
  productImage: {
    height: 150,
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
    height: 40,
  },
  price: {
    fontSize: 16,
    color: "green",
    fontWeight: "600",
  },
  buyButton: {
    backgroundColor: "#7B61B3",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addedButton: {
    backgroundColor: "#A5D6A7",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
