import { View, Text, StyleSheet } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import Popup from "react-native-modal";
import TextBox from "./TextBox";
import CTButton from "./CTButton";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const CostTypePicker = ({ oldTypes, onChoose }) => {
  const [addedType, setAddedType] = useState();
  const [costTypes, setCostTypes] = useState(oldTypes);
  const [isAddTypeVisible, setIsAddTypeVisible] = useState(false);
  const [isTypeSelectFocus, setIsTypeSelectFocus] = useState(false);

  return (
    <>
      <Dropdown
        data={costTypes}
        placeholder="General"
        style={[styles.dropdown, isTypeSelectFocus && { borderColor: "blue" }]}
        search
        labelField="label"
        valueField="value"
        onFocus={() => setIsTypeSelectFocus(true)}
        onBlur={() => setIsTypeSelectFocus(false)}
        onChange={(item) => {
          if (item.value === 0) setIsAddTypeVisible(true);
          else {
            onChoose(item.name);
          }
          setIsTypeSelectFocus(false);
        }}
      />

      <Popup
        isVisible={isAddTypeVisible}
        onBackButtonPress={() => setIsAddTypeVisible(false)}
        style={{ alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 230,
            height: 130,
          }}
        >
          <TextBox
            placeholder="Name"
            value={addedType}
            onChangeText={(text) => setAddedType(text)}
          />
          <CTButton
            onPress={() => {
              setCostTypes((existingTypes) => {
                if (
                  addedType !== "Add New" &&
                  !existingTypes.find((t) => t.name === addedType)
                )
                  return [
                    ...existingTypes,
                    {
                      value: Math.max([...existingTypes]) + 1,
                      label: addedType,
                    },
                  ];
                else return existingTypes;
              });
              setIsAddTypeVisible(false);
            }}
          >
            <Text>Confirm</Text>
          </CTButton>
        </View>
      </Popup>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    margin: 10,
  },
});

export default CostTypePicker;
