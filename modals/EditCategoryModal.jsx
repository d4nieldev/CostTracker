import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import ColorPickerModal from "./ColorPickerModal";
import TextBox from "../components/TextBox";
import CTButton from "../components/CTButton";
import LargeText from "../components/LargeText";

const EditCategoryModal = ({ category, onEditCategory, visible, onCancel }) => {
  if (!category) return <></>;
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(category.color);
  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryNameBorderColor, setCategoryNameBorderColor] =
    useState("black");

  const categoryEditHandler = () => {
    if (categoryName.trim().length === 0) {
      setCategoryNameBorderColor("red");
      return;
    }
    onEditCategory(categoryName, selectedColor);
    onCloseModal();
  };

  const onCloseModal = () => {
    setIsColorPickerVisible(false);
    setSelectedColor(category.color);
    setCategoryName(category.name);
    setCategoryNameBorderColor("black");
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onCloseModal}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.screen}
      >
        <View style={styles.colorWrapper}>
          <View style={{ flex: 1, height: 70 }}>
            <TextBox
              value={categoryName}
              style={{ borderColor: categoryNameBorderColor }}
              onChangeText={(text) => setCategoryName(text)}
            />
          </View>
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
          <CTButton onPress={categoryEditHandler}>
            <Text>Confirm</Text>
          </CTButton>
          <CTButton onPress={onCloseModal} style={{ backgroundColor: "red" }}>
            <Text>Cancel</Text>
          </CTButton>
        </View>
      </ScrollView>
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
    alignItems: "center",
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

export default EditCategoryModal;
