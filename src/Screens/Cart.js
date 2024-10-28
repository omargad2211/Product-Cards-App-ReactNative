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
import { removeFromCart } from "../Redux/cartSlice";
import dayjs from "dayjs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Header from "../Components/common/Header";
import Empty from "./Empty";
import { useNavigation } from "@react-navigation/native";



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
      </TouchableOpacity>
    </View>
  );

  const navigation = useNavigation();
  return (
    <View>
      <Header title="Cart" />

      <View style={styles.container}>
        <FlatList
          data={recentItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.cartList}
        />
        {recentItems.length === 0 && (
          <Empty
            message="Your cart is empty!"
            buttonText="Shop Now"
            onPress={() => navigation.navigate("shop")}
          />
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FB5B21",
    marginBottom: 16,
    textAlign: "center",
  },
  cartList: {
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
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
    color: "#7B61B3",
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
