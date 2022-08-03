import { useState } from "react";
import { Image, Modal, View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import CTButton from "../components/CTButton";

const LocationPickerModal = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(
    props.currentLocation
  );

  const closeModal = () => {
    setSelectedLocation(props.currentLocation);
    props.onCancel();
  };

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <MapView
        initialRegion={{
          latitude: props.currentLocation.latitude,
          longitude: props.currentLocation.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={{ flex: 1, width: "100%" }}
        onPress={(e) => {
          setSelectedLocation(e.nativeEvent.coordinate);
        }}
      >
        <Marker title="Transaction Location" coordinate={selectedLocation}>
          <Image
            source={require("../assets/location.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
      <View style={styles.buttonContainer}>
        <CTButton onPress={() => props.onSetLocation(selectedLocation)}>
          <Text>Confirm</Text>
        </CTButton>
        <CTButton onPress={closeModal} style={{ backgroundColor: "red" }}>
          <Text>Cancel</Text>
        </CTButton>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});

export default LocationPickerModal;
