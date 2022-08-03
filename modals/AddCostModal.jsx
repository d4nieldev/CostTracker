import { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import LargeText from "../components/LargeText";
import TextBox from "../components/TextBox";
import CTButton from "../components/CTButton";
import * as Location from "expo-location";
import LocationPickerModal from "./LocationPickerModal";

const AddCostModal = (props) => {
  const [costTitle, setCostTitle] = useState("");
  const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);

  // fetch location
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getLastKnownPositionAsync();
      setLocation(location);
    })();
  }, []);

  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.onCancel}
      animationType="slide"
    >
      <View style={styles.screen}>
        <LargeText style={{ paddingVertical: 70 }}>
          Add a New Cost to {props.category.name}
        </LargeText>

        <View style={{ flexDirection: "row" }}>
          <TextBox
            placeholder="Title"
            style={{ flex: 2 }}
            onChangeText={(text) => setCostTitle(text)}
          />
          <TextBox
            keyboardType="numeric"
            placeholder="cost"
            onChangeText={(text) => setCostTitle(text)}
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
          onSetLocation={(newLocation) => setLocation(newLocation)}
        />

        {/*date*/}
        <View style={{ flexDirection: "row" }}></View>
        <View style={styles.buttonsContainer}>
          <CTButton onPress={() => props.onAdd()}>
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

export default AddCostModal;
