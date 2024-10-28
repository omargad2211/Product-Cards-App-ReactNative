import "@expo/metro-runtime";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

import HomeScreen from "./src/Screens/HomeScreen";
import Cart from "./src/Screens/Cart";
import store from "./src/Redux/store"; 
import { Provider } from "react-redux";

export default function App() {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Navigator
            screenOptions={{
              headerBackVisible: false,
              tabBarActiveTintColor: "green",
              tabBarShowLabel: false,
              tabBarStyle: {
                padding: 5,
              },
            }}
          >
            <Screen
              name="shop"
              component={HomeScreen}
              options={{
                headerTitleAlign: "center",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="shop" size={24} color={color} />
                ),
              }}
            />
            <Screen
              name="Cart"
              component={Cart}
              options={{
                headerTitleAlign: "center",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="shoppingcart" size={24} color={color} />
                ),
              }}
            />
          </Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
