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
  const [categories, setCategories] = useState([]);

  const addCategoryHandler = (categoryName, categoryColor) => {
    setCategories((existingCategories) => [
      ...existingCategories,
      { name: categoryName, color: categoryColor, items: [] },
    ]);
  };

  const addCostHandler = (category, title, amount, location, date) => {
    setCategories((existingCategories) => {
      const unChangedCategories = existingCategories.filter(
        (c) => c != category
      );
      const modifiedCategory = { ...category };
      const lastId = Math.max(...modifiedCategory.items.map((cost) => cost.id));

      modifiedCategory.items = [
        ...category.items,
        { id: lastId + 1, title, location, date, cost: amount },
      ];
      console.log(modifiedCategory);
      return [...unChangedCategories, modifiedCategory];
    });
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name={Names.screens.home}>
          {(props) => (
            <HomeScreen
              {...props}
              categories={categories}
              onAddCategory={addCategoryHandler}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name={Names.screens.history}>
          {(props) => <HistoryScreen {...props} categories={categories} />}
        </Drawer.Screen>

        {categories.map((c) => (
          <Drawer.Screen
            name={c.name}
            options={{ drawerItemStyle: { backgroundColor: c.color } }}
          >
            {(props) => (
              <CategoryScreen
                {...props}
                category={c}
                onAddCost={addCostHandler}
              />
            )}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
