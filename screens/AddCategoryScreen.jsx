import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";
import ColorPickerModal from "../components/ColorPickerModal";
import TextBox from "../components/TextBox";
import CTButton from "../components/CTButton";

const AddCategoryScreen = () => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");
  const [categoryName, setCategoryName] = useState("");

  return (
    <View style={styles.screen}>
      <View style={styles.colorWrapper}>
        <TextBox placeholder="Category Name" />

        <TouchableOpacity onPress={() => setIsColorPickerVisible(true)}>
          <View style={styles.colorView} backgroundColor={selectedColor} />
        </TouchableOpacity>
      </View>

      <CTButton>
        <Text>Add</Text>
      </CTButton>

      <ColorPickerModal
        visible={isColorPickerVisible}
        color={selectedColor}
        onClose={() => setIsColorPickerVisible(false)}
        onChangeColor={(color) => setSelectedColor(color)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  colorWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  colorView: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

export default AddCategoryScreen;
