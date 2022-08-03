import { Modal, StyleSheet } from "react-native";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";

const ColorPickerModal = ({ visible, color, onClose, onChangeColor }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <ColorPicker
        style={{ flex: 1 }}
        color={toHsv(color)}
        onColorChange={(color) => onChangeColor(fromHsv(color))}
        onColorSelected={() => onClose()}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ColorPickerModal;
