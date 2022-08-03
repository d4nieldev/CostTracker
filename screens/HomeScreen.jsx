import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import SumCosts from "../components/SumCosts";
import Names from "../constants/Names";
import CTButton from "../components/CTButton";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoriesMenu from "../components/CategoriesMenu";
import AddCategoryModal from "../modals/AddCategoryModal";

const Drawer = createDrawerNavigator();

const HomeScreen = ({
  navigation: { navigate },
  categories,
  onAddCategory,
}) => {
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);

  const calculateTotalCosts = () => {
    return categories.reduce(
      (totalSum, curCategory) =>
        totalSum +
        curCategory.items.reduce(
          (categorySum, curCost) => categorySum + curCost.cost,
          0
        ),
      0
    );
  };

  const HandleAddCategory = (categoryName, selectedColor) => {
    onAddCategory(categoryName, selectedColor);
    setIsAddCategoryVisible(false);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to CostTracker!</Text>
      <SumCosts
        sum={calculateTotalCosts()}
        category="total"
        onShowHistory={() => navigate(Names.screens.history)}
      />
      <CTButton onPress={() => setIsAddCategoryVisible(true)}>
        <Text>Add a New Category</Text>
      </CTButton>

      <AddCategoryModal
        visible={isAddCategoryVisible}
        onAddCategory={HandleAddCategory}
        onCancel={() => setIsAddCategoryVisible(false)}
      />

      {/* <CategoriesMenu categories={categories} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    paddingBottom: 15,
  },
});

export default HomeScreen;
