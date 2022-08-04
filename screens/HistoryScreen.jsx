import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import LargeText from "../components/LargeText";
import LocationPickerModal from "../modals/LocationPickerModal";

const HistoryScreen = ({ categories }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [locationToView, setLocationToView] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [costTitleToView, setCostTitleToView] = useState("");
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

  const renderItems = (category) => {
    return (
      <View style={styles.categoryContainer}>
        <LargeText style={{ backgroundColor: category.color }}>
          {category.name}
        </LargeText>
        {category.items.map((cost) => (
          <Cost
            cost={cost}
            onViewLocation={(location) => {
              setCostTitleToView(cost.title);
              setLocationToView(location);
              setIsMapVisible(true);
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item }) => renderItems(item)}
        keyExtractor={(item) => item.name}
      />

      {renderLocationModal()}
    </>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 15,
  },
});

export default HistoryScreen;
