import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import CTButton from "../components/CTButton";
import AddCostModal from "../modals/AddCostModal";
import LocationPickerModal from "../modals/LocationPickerModal";
import EditCostModal from "../modals/EditCostModal";

const CategoryScreen = ({ category, onAddCost, onDeleteCost, onEditCost }) => {
  const [isAddCostVisible, setIsAddCostVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [locationToView, setLocationToView] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [costTitleToView, setCostTitleToView] = useState("");
  const [editCostVisible, setEditCostVisible] = useState(false);
  const [editedCost, setEditedCost] = useState();

  const renderCosts = (item) => {
    return (
      <Cost
        cost={item}
        onViewLocation={(location) => {
          setCostTitleToView(item.title);
          setLocationToView(location);
          setIsMapVisible(true);
        }}
        onDelete={(id) => onDeleteCost(category.id, id)}
        onEdit={() => {
          setEditCostVisible(true);
          setEditedCost(item);
        }}
      />
    );
  };

  const addCostHandler = (title, amount, location, date, type) => {
    onAddCost(category, title, amount, location, date, type);
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
      <LocationPickerModal
        visible={isMapVisible}
        currentLocation={locationToView}
        onCancel={() => setIsMapVisible(false)}
        markerTitle={costTitleToView}
      />

      <EditCostModal
        visible={editCostVisible}
        cost={editedCost}
        onClose={() => setEditCostVisible(false)}
        onEdit={(title, cost, location, date) =>
          onEditCost(category.id, editedCost.id, title, cost, location, date)
        }
      />

      <AddCostModal
        visible={isAddCostVisible}
        onCancel={() => setIsAddCostVisible(false)}
        category={category}
        onAdd={addCostHandler}
      />
    </View>
  );
};

export default CategoryScreen;
