import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Category({
  categoryItem,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelectedCategory(categoryItem)}>
        <Text
          style={[
            styles.categoryText,
            selectedCategory === categoryItem && {
              color: "#FFFFFF",
              backgroundColor: "green",
            },
          ]}
        >
          {categoryItem}
        </Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#DFDCDC",
    textAlign: "center",
    borderRadius: 16,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    paddingVertical: 10,
  },
});
