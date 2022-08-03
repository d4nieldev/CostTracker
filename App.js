import "react-native-gesture-handler";

import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import Names from "./constants/Names";
import { Button } from "react-native";
import CategoryScreen from "./screens/CategoryScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [categories, setCategories] = useState([
    {
      name: "TEST",
      color: "red",
      items: [
        {
          title: "Bought a bike",
          cost: 25,
        },
      ],
    },
    {
      name: "TEST2",
      color: "blue",
      items: [
        {
          title: "Bought a car",
          cost: 100,
        },
      ],
    },
  ]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name={Names.screens.home}>
          {(props) => (
            <HomeScreen
              categories={categories}
              onAddCategory={(category) => console.log("Added " + category)}
              {...props}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name={Names.screens.history} component={HistoryScreen} />
        {categories.map((c) => (
          <Drawer.Screen
            name={c.name}
            options={{ drawerItemStyle: { backgroundColor: c.color } }}
          >
            {(props) => <CategoryScreen category={c} />}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
