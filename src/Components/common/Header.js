import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 

const Header = ({ title = "Home" }) => {
  return (
    <LinearGradient
      colors={["green", "#A5D6A7"]} 
      style={styles.headerContainer}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: 1,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default Header;
