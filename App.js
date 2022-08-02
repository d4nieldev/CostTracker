import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CostScreen from "./screens/CostScreen";
import Names from "./constants/Names";

const Stack = createStackNavigator();

export default function App() {
  const [categories, setCategories] = useState([
    { name: "TEST", color: "red" },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name={Names.screens.home}>
          {(props) => (
            <HomeScreen
              categories={categories}
              onAddCategory={(category) => console.log("Added " + category)}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name={Names.screens.history} component={HistoryScreen} />
        <Stack.Screen
          name={Names.screens.addCategory}
          component={AddCategoryScreen}
        />
        <Stack.Screen
          name={Names.screens.category}
          component={CategoryScreen}
        />
        <Stack.Screen name={Names.screens.cost} component={CostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
