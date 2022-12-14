import { useState } from "react";
import { Text, Modal, StyleSheet, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CTButton from "../components/CTButton";
import TextBox from "../components/TextBox";
import LocationPickerModal from "./LocationPickerModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import CostTypePicker from "../components/CostTypePicker";
import LargeText from "../components/LargeText";

const EditCostModal = ({ visible, cost, onClose, onEdit, types }) => {
  if (!cost) return <></>;
  const [title, setTitle] = useState(cost.title);
  const [amount, setAmount] = useState(cost.cost.toString());
  const [location, setLocation] = useState(cost.location);
  const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);
  const [date, setDate] = useState(cost.date);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [costType, setCostType] = useState(cost.type);
  const [multiplier, setMultiplier] = useState(cost.multiplier.toString());

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
          setCostType(cost.type);
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ alignItems: "center", margin: 30 }}
        >
          <View style={styles.fieldWrapper}>
            <View style={{ flex: 1 }}>
              <Text>New Title</Text>
              <TextBox value={title} onChangeText={(text) => setTitle(text)} />
            </View>
            <View style={{ flex: 1 }}>
              <Text>New Cost</Text>
              <TextBox
                value={amount}
                keyboardType="numeric"
                onChangeText={(text) => setAmount(text)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text>New Multiplier</Text>
              <TextBox
                placeholder="$ value"
                value={multiplier}
                keyboardType="numeric"
                onChangeText={(text) => setMultiplier(text)}
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CostTypePicker
              oldTypes={[
                {
                  value: 0,
                  label: "Add New",
                },
                ...types.map((item, index) => ({
                  value: index + 1,
                  label: item,
                })),
              ]}
              onChoose={(chosenType) => setCostType(chosenType)}
            />
          </View>

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
                onEdit(
                  title,
                  parseFloat(amount),
                  location,
                  date,
                  costType,
                  parseFloat(multiplier)
                );
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
        </ScrollView>
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
