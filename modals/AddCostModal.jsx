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
import MapView, { Marker } from "react-native-maps";

const AddCostModal = (props) => {
  const [costTitle, setCostTitle] = useState("");
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
      {console.log(location)}
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
        {/*location*/}

        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={{ flex: 1, width: "100%" }}
          onPress={(e) => {
            console.log(location);
          }}
        >
          <Marker title="You are here" coordinate={location.coords}>
            <Image
              source={require("../assets/location.png")}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
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
