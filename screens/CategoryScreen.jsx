import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import CTButton from "../components/CTButton";
import AddCostModal from "../modals/AddCostModal";

const CategoryScreen = ({ category, onAddCost }) => {
  const [isAddCostVisible, setIsAddCostVisible] = useState(false);

  const renderCosts = (item) => {
    return <Cost cost={item} />;
  };

  const addCostHandler = (title, amount, location, date) => {
    onAddCost(category, title, amount, location, date);
    setIsAddCostVisible(false);
  };

  return (
    <View>
      <FlatList
        data={category.items}
        renderItem={({ item }) => renderCosts(item)}
        keyExtractor={(item) => item.id}
      />

      <CTButton onPress={() => setIsAddCostVisible(true)}>
        <Text>+</Text>
      </CTButton>

      <AddCostModal
        visible={isAddCostVisible}
        onCancel={() => setIsAddCostVisible(false)}
        category={category}
        onAdd={(title, amount, location, date) =>
          addCostHandler(title, amount, location, date)
        }
      />
    </View>
  );
};

export default CategoryScreen;
