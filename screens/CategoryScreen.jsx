import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import CTButton from "../components/CTButton";
import AddCostModal from "../modals/AddCostModal";

const CategoryScreen = ({ category }) => {
  const [isAddCostVisible, setIsAddCostVisible] = useState(false);

  const renderCosts = (item) => {
    return <Cost cost={item} />;
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
        onAdd={() => console.log("Adding cost")}
      />
    </View>
  );
};

export default CategoryScreen;
