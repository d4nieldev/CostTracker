import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import Colors from "../constants/Colors";
import ColorPickerModal from "./ColorPickerModal";
import TextBox from "../components/TextBox";
import CTButton from "../components/CTButton";
import LargeText from "../components/LargeText";

const AddCategoryModal = (props) => {
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    Colors.defaultCategoryColor
  );
  const [categoryName, setCategoryName] = useState("");

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onCancel}
    >
      <View style={styles.screen}>
        <LargeText style={{ paddingVertical: 70 }}>
          Add a New Category
        </LargeText>

        <View style={styles.colorWrapper}>
          <TextBox
            placeholder="Category Name"
            onChangeText={(text) => setCategoryName(text)}
          />

          <TouchableOpacity onPress={() => setIsColorPickerVisible(true)}>
            <View style={styles.colorView} backgroundColor={selectedColor} />
          </TouchableOpacity>
        </View>

        <ColorPickerModal
          visible={isColorPickerVisible}
          color={selectedColor}
          onClose={() => setIsColorPickerVisible(false)}
          onChangeColor={(color) => setSelectedColor(color)}
        />
        <View style={styles.buttonsContainer}>
          <CTButton
            onPress={() => props.onAddCategory(categoryName, selectedColor)}
          >
            <Text>Add</Text>
          </CTButton>
          <CTButton
            onPress={() => props.onCancel()}
            style={{ backgroundColor: "red" }}
          >
            <Text>Cancel</Text>
          </CTButton>
        </View>
      </View>
    </Modal>
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
  buttonsContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
  },
});

export default AddCategoryModal;
