import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import CTButton from "../components/CTButton";
import AddCostModal from "../modals/AddCostModal";
import LocationPickerModal from "../modals/LocationPickerModal";
import EditCostModal from "../modals/EditCostModal";

const CategoryScreen = ({ category, onAddCost, onDeleteCost }) => {
  const [isAddCostVisible, setIsAddCostVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [locationToView, setLocationToView] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [costTitleToView, setCostTitleToView] = useState("");
  const [editCostVisible, setEditCostVisible] = useState(false);
  const [editedCostModal, setEditedCostModal] = useState();

  const renderLocationModal = () => {
    return (
      <LocationPickerModal
        visible={isMapVisible}
        currentLocation={locationToView}
        onCancel={() => setIsMapVisible(false)}
        markerTitle={costTitleToView}
      />
    );
  };

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
          setEditedCostModal(
            <EditCostModal visible={editCostVisible} cost={item} />
          );
        }}
      />
    );
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

      {renderLocationModal()}

      {editedCostModal}

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
