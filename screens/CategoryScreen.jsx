import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Cost from "../components/Cost";
import CTButton from "../components/CTButton";
import AddCostModal from "../modals/AddCostModal";
import LocationPickerModal from "../modals/LocationPickerModal";
import EditCostModal from "../modals/EditCostModal";
import { Dropdown } from "react-native-element-dropdown";

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

  const [sortByValue, setSortByValue] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [isSortDescending, setIsSortDescending] = useState(true);

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
  const data = [
    { label: "Addition Date", value: 1 },
    { label: "Date", value: 2 },
    { label: "Cost", value: 3 },
    { label: "Type", value: 4 },
    { label: "Title", value: 5 },
  ];

  const addCostHandler = (title, amount, location, date, type) => {
    onAddCost(category, title, amount, location, date, type);
    setIsAddCostVisible(false);
  };

  const sortItems = () => {
    const compareByAdditionDate = (a, b) => a.id > b.id;
    const compareByDate = (a, b) => a.date > b.date;
    const compareByCost = (a, b) => a.cost > b.cost;
    const compareByType = (a, b) => a.type > b.type;
    const compareByTitle = (a, b) => a.title > b.title;

    let comperator;
    switch (sortByValue) {
      case 1:
        comperator = compareByAdditionDate;
      case 2:
        comperator = compareByDate;
      case 3:
        comperator = compareByCost;
      case 4:
        comperator = compareByType;
      case 5:
        comperator = compareByTitle;
    }
    category.items.sort(
      isSortDescending ? comperator : (a, b) => !comperator(a, b)
    );
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          containerStyle={{ marginTop: -40 }}
          data={data}
          placeholder="Addition Date"
          labelField="label"
          valueField="value"
          value={sortByValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSortByValue(item.value);
            setIsFocus(false);
            sortItems();
          }}
        />
        <View style={{ alignItems: "center", flex: 1, width: 40, height: 40 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsSortDescending((cur) => !cur);
              sortItems();
            }}
          >
            <Image
              source={
                isSortDescending
                  ? require("../assets/arrow-down.png")
                  : require("../assets/arrow-up.png")
              }
              style={{ width: 40, height: 40 }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>

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
        onEdit={(title, cost, location, date, type) =>
          onEditCost(
            category.id,
            editedCost.id,
            title,
            cost,
            location,
            date,
            type
          )
        }
        category={category}
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

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 4,
  },
});

export default CategoryScreen;
