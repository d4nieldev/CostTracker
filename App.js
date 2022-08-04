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
    setCategories((existingCategories) => {
      const lastId =
        existingCategories.length !== 0
          ? Math.max(...existingCategories.map((c) => c.id))
          : 0;
      return [
        ...existingCategories,
        { id: lastId + 1, name: categoryName, color: categoryColor, items: [] },
      ];
    });
  };

  const addCostHandler = (category, title, amount, location, date) => {
    setCategories((existingCategories) => {
      const unChangedCategories = existingCategories.filter(
        (c) => c != category
      );
      const modifiedCategory = { ...category };
      const lastId =
        modifiedCategory.items.length !== 0
          ? Math.max(...modifiedCategory.items.map((cost) => cost.id))
          : 0;

      modifiedCategory.items = [
        ...category.items,
        { id: lastId + 1, title, location, date, cost: amount },
      ];
      return [...unChangedCategories, modifiedCategory];
    });
  };

  const deleteCostHandler = (categoryId, costId) => {
    setCategories((existingCategories) => {
      let categoryToDeleteFrom = existingCategories.find(
        (c) => c.id === categoryId
      );
      categoryToDeleteFrom.items = categoryToDeleteFrom.items.filter(
        (c) => c.id !== costId
      );
      return [
        ...existingCategories.filter((c) => c.id !== categoryId),
        categoryToDeleteFrom,
      ];
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
            key={c.id}
          >
            {(props) => (
              <CategoryScreen
                {...props}
                category={c}
                onAddCost={addCostHandler}
                onDeleteCost={deleteCostHandler}
              />
            )}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
