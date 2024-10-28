import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Empty = ({
  message = "Nothing here yet!",
  buttonText = "Add New",
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "assets/empty-cart.webp" }}
        style={styles.image}
      />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: "#7B61B3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Empty;
