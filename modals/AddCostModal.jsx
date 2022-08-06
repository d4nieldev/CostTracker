import { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import LargeText from "../components/LargeText";
import TextBox from "../components/TextBox";
import CTButton from "../components/CTButton";
import * as Location from "expo-location";
import LocationPickerModal from "./LocationPickerModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import CostTypePicker from "../components/CostTypePicker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";

const AddCostModal = (props) => {
  const [costTitle, setCostTitle] = useState("");
  const [costTitleBorderColor, setCostTitleBorderColor] = useState("black");
  const [costAmount, setCostAmount] = useState();
  const [costAmountBorderColor, setCostAmountBorderColor] = useState("black");
  const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [costDate, setCostDate] = useState(new Date());
  const [startLocation, setStartLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [costType, setCostType] = useState("General");
  const [multiplier, setMultiplier] = useState("1");

  // fetch location
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const closeModal = () => {
    resetFields();
    props.onCancel();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
      setStartLocation({ latitude, longitude });
    })();
  }, []);

  const changeDateHandler = (e, selectedDate) => {
    setCostDate(selectedDate);
    setIsDateTimePickerVisible(false);
  };

  const addCostHandler = () => {
    let errorOccured = false;
    if (costTitle.trim().length === 0) {
      errorOccured = true;
      setCostTitleBorderColor("red");
    } else setCostTitleBorderColor("black");

    if (isNaN(parseFloat(costAmount)) || parseFloat(costAmount) < 0) {
      errorOccured = true;
      setCostAmountBorderColor("red");
    } else setCostAmountBorderColor("black");

    if (!errorOccured) {
      props.onAdd(
        costTitle,
        costAmount,
        location,
        costDate,
        costType,
        parseFloat(multiplier)
      );
      resetFields();
    }
  };

  const resetFields = () => {
    setCostTitle("");
    setCostTitleBorderColor("");
    setCostAmount(0);
    setCostAmountBorderColor("black");
    setIsLocationPickerVisible(false);
    setIsDateTimePickerVisible(false);
    setCostDate(new Date());
    setStartLocation({
      latitude: 0,
      longitude: 0,
    });
    setCostType("General");
    setLocation({
      latitude: 0,
      longitude: 0,
    });
    setErrorMsg(null);
  };

  const setLocationHandler = (newLocation) => {
    setLocation(newLocation);
    setIsLocationPickerVisible(false);
  };

  return (
    <Modal
      visible={props.visible}
      onRequestClose={closeModal}
      animationType="slide"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.screen}
      >
        <LargeText style={{ paddingVertical: 70 }}>
          Add a New Cost to {props.category.name}
        </LargeText>

        <View style={{ flexDirection: "row" }}>
          <TextBox
            placeholder="Title"
            value={costTitle}
            style={{ flex: 2, borderColor: costTitleBorderColor }}
            onChangeText={(text) => setCostTitle(text)}
          />
          <TextBox
            placeholder="Cost"
            style={{ borderColor: costAmountBorderColor }}
            value={costAmount}
            keyboardType="numeric"
            onChangeText={(text) => setCostAmount(text)}
          />
          <TextBox
            placeholder="$ value"
            value={multiplier}
            keyboardType="numeric"
            onChangeText={(text) => setMultiplier(text)}
          />
        </View>

        <Text>{errorMsg}</Text>
        <CTButton
          style={{ backgroundColor: "grey" }}
          onPress={() => setIsLocationPickerVisible(true)}
        >
          <Text>Pick Location (Optinal)</Text>
        </CTButton>

        <LocationPickerModal
          visible={isLocationPickerVisible}
          onCancel={() => setIsLocationPickerVisible(false)}
          currentLocation={location}
          onSetLocation={(newLocation) => setLocationHandler(newLocation)}
          markerTitle="Transaction Location"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CostTypePicker
            oldTypes={[
              {
                value: 0,
                label: "Add New",
              },
              ...props.types.map((item, index) => ({
                value: index + 1,
                label: item,
              })),
            ]}
            onChoose={(chosenType) => setCostType(chosenType)}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Text style={{ flex: 5 }}>{costDate.toDateString()}</Text>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsDateTimePickerVisible(true)}
          >
            <Image
              source={require("../assets/calendar.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
        {isDateTimePickerVisible && (
          <DateTimePicker
            value={costDate}
            onChange={(event, selectedDate) =>
              changeDateHandler(event, selectedDate)
            }
            style={{ width: 320, backgroundColor: "white" }}
          />
        )}

        <View style={{ flexDirection: "row" }}></View>
        <View style={styles.buttonsContainer}>
          <CTButton onPress={addCostHandler}>
            <Text>Add</Text>
          </CTButton>
          <CTButton
            onPress={() => closeModal()}
            style={{ backgroundColor: "red" }}
          >
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

export default AddCostModal;
