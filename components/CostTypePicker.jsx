import { View, Text } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import Popup from "react-native-modal";
import TextBox from "./TextBox";
import CTButton from "./CTButton";
import { useState } from "react";

const CostTypePicker = ({ oldTypes, onChoose }) => {
  const [addedType, setAddedType] = useState();
  const [costTypes, setCostTypes] = useState(oldTypes);
  const [isAddTypeVisible, setIsAddTypeVisible] = useState(false);

  return (
    <>
      <SearchableDropdown
        items={costTypes}
        containerStyle={{ padding: 5 }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        textInputProps={{
          placeholder: "Select type",
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          },
        }}
        onItemSelect={(item) => {
          if (item.id === 0) setIsAddTypeVisible(true);
          else {
            onChoose(item.name);
          }
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
                    { id: Math.max([...existingTypes]) + 1, name: addedType },
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

export default CostTypePicker;
