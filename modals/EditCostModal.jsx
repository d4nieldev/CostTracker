import { useState } from "react";
import { Text, Modal, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CTButton from "../components/CTButton";
import TextBox from "../components/TextBox";
import LocationPickerModal from "./LocationPickerModal";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditCostModal = ({ visible, cost, onClose, onEdit }) => {
  if (!cost) return <></>;
  const [title, setTitle] = useState(cost.title);
  const [amount, setAmount] = useState(cost.cost);
  const [location, setLocation] = useState(cost.location);
  const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);
  const [date, setDate] = useState(cost.date);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => onClose()}
        animationType="slide"
        onShow={() => {
          setTitle(cost.title);
          setAmount(cost.cost);
          setLocation(cost.location);
          setIsLocationPickerVisible(false);
          setDate(cost.date);
          setIsDateTimePickerVisible(false);
        }}
      >
        <View style={{ alignItems: "center", margin: 30 }}>
          <View style={styles.fieldWrapper}>
            <View style={{ flex: 1 }}>
              <Text>New Title</Text>
              <TextBox value={title} onChangeText={(text) => setTitle(text)} />
            </View>
            <View style={{ flex: 1 }}>
              <Text>New Cost</Text>
              <TextBox
                value={amount.toString()}
                keyboardType="numeric"
                onChangeText={(text) => setAmount(parseFloat(text))}
              />
            </View>
          </View>

          <CTButton
            style={{ backgroundColor: "grey" }}
            onPress={() => setIsLocationPickerVisible(true)}
          >
            <Text>Select New Location</Text>
          </CTButton>
          <LocationPickerModal
            visible={isLocationPickerVisible}
            onCancel={() => setIsLocationPickerVisible(false)}
            currentLocation={location}
            markerTitle={cost.title}
            onSetLocation={(newLocation) => setLocation(newLocation)}
          />

          <CTButton onPress={() => setIsDateTimePickerVisible(true)}>
            <Text>Select New Date</Text>
          </CTButton>
          {isDateTimePickerVisible && (
            <DateTimePicker
              value={date}
              onChange={(event, selectedDate) => {
                setDate(selectedDate);
                setIsDateTimePickerVisible(false);
              }}
            />
          )}

          <View style={{ flexDirection: "row" }}>
            <CTButton
              title="Confirm"
              onPress={() => {
                onEdit(title, amount, location, date);
                onClose();
              }}
            >
              <Text>Confirm</Text>
            </CTButton>
            <CTButton
              title="Cancel"
              style={{ backgroundColor: "red" }}
              onPress={() => onClose()}
            >
              <Text>Cancel</Text>
            </CTButton>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    flexDirection: "row",
    height: 90,
  },
});

export default EditCostModal;
