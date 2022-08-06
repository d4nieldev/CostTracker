import "react-native-gesture-handler";

import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import Names from "./constants/Names";
import CategoryScreen from "./screens/CategoryScreen";
import CTButton from "./components/CTButton";
import { Image, Text, View } from "react-native";
import EditCategoryModal from "./modals/EditCategoryModal";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

export default function App() {
  const [categories, setCategories] = useState([]);

  const load = async () => {
    try {
      let savedCategories = await AsyncStorage.getItem("@categories");
      savedCategories = JSON.parse(savedCategories);

      if (savedCategories !== null) {
        savedCategories.forEach((c) =>
          c.items.forEach((i) => (i.date = new Date(i.date)))
        );
        setCategories(savedCategories);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const presistData = async (data) => {
    try {
      await AsyncStorage.setItem("@categories", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  const [isEditCategoryVisible, setIsEditCategoryVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState();

  const compareObjects = (a, b) => a.id < b.id;

  const addCategoryHandler = (categoryName, categoryColor) => {
    setCategories((existingCategories) => {
      const lastId =
        existingCategories.length !== 0
          ? Math.max(...existingCategories.map((c) => c.id))
          : 0;
      const output = [
        ...existingCategories,
        { id: lastId + 1, name: categoryName, color: categoryColor, items: [] },
      ];
      output.sort(compareObjects);
      presistData(output);
      return output;
    });
  };

  const editCategoryHandler = (categoryName, categoryColor) => {
    setCategories((existingCategories) => {
      const otherCategories = existingCategories.filter(
        (c) => c !== editedCategory
      );
      editedCategory.name = categoryName;
      editedCategory.color = categoryColor;
      const output = [...otherCategories, editedCategory];
      output.sort();
      presistData(output);
      return output;
    });
  };

  const DeleteCategoryHandler = (categoryToRemove) => {
    setCategories((existingCategories) => {
      const output = existingCategories.filter((c) => c !== categoryToRemove);
      presistData(output);
      return output;
    });
  };

  const addCostHandler = (category, title, amount, location, date, type) => {
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
        { id: lastId + 1, title, location, date, cost: amount, type },
      ];

      modifiedCategory.items.sort(compareObjects);
      const output = [...unChangedCategories, modifiedCategory];
      output.sort(compareObjects);
      presistData(output);

      return output;
    });
  };

  const editCostHandler = (
    categoryId,
    costId,
    title,
    cost,
    location,
    date,
    type
  ) => {
    setCategories((existingCategories) => {
      const categoryToEdit = existingCategories.find(
        (c) => c.id === categoryId
      );
      let costToEdit = categoryToEdit.items.find((c) => c.id === costId);
      costToEdit = { id: costId, title, location, date, cost, type };
      categoryToEdit.items = [
        ...categoryToEdit.items.filter((c) => c.id !== costId),
        costToEdit,
      ];
      categoryToEdit.items.sort(compareObjects);
      const output = [
        ...existingCategories.filter((c) => c.id != categoryId),
        categoryToEdit,
      ];
      output.sort();
      presistData(output);
      return output;
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
      categoryToDeleteFrom.items.sort(compareObjects);
      const output = [
        ...existingCategories.filter((c) => c.id !== categoryId),
        categoryToDeleteFrom,
      ];
      output.sort();
      presistData(output);
      return output;
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

        <Drawer.Screen name={Names.screens.analytics}>
          {(props) => <AnalyticsScreen {...props} categories={categories} />}
        </Drawer.Screen>

        {categories.map((c) => (
          <Drawer.Screen
            name={c.name}
            options={{
              drawerItemStyle: { backgroundColor: c.color },
              headerRight: () => (
                <View style={{ flexDirection: "row" }}>
                  <CTButton
                    style={{ backgroundColor: "grey", width: 40, height: 40 }}
                    onPress={() => {
                      setEditedCategory(c);
                      setIsEditCategoryVisible(true);
                    }}
                  >
                    <Image
                      source={require("./assets/edit.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </CTButton>
                  <CTButton
                    style={{ backgroundColor: "red", width: 40, height: 40 }}
                    onPress={() => DeleteCategoryHandler(c)}
                  >
                    <Image
                      source={require("./assets/delete.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </CTButton>
                </View>
              ),
            }}
            key={c.id}
          >
            {(props) => (
              <CategoryScreen
                {...props}
                category={c}
                types={categories
                  .flatMap((c) => c.items)
                  .reduce((arr, item) => {
                    if (!arr.includes(item.type)) arr.push(item.type);
                    return arr;
                  }, [])}
                onAddCost={addCostHandler}
                onDeleteCost={deleteCostHandler}
                onEditCost={editCostHandler}
              />
            )}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>

      <EditCategoryModal
        visible={isEditCategoryVisible}
        category={editedCategory}
        onCancel={() => setIsEditCategoryVisible(false)}
        onEditCategory={(title, color) => editCategoryHandler(title, color)}
      />
    </NavigationContainer>
  );
}
