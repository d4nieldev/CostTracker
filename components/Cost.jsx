import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import CTButton from "./CTButton";

const Cost = ({ cost, onViewLocation, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.itemTitle}>{cost.title}</Text>
        <TouchableOpacity onPress={() => onViewLocation(cost.location)}>
          <Text>See transaction location on map</Text>
        </TouchableOpacity>
        <Text style={styles.detailItem}>{cost.date.toDateString()}</Text>
        <Text style={styles.detailItem}>{cost.cost}</Text>
        <Text style={styles.detailItem}>{cost.type}</Text>
      </View>
      <View>
        {onDelete ? (
          <CTButton
            style={{ backgroundColor: "red" }}
            onPress={() => onDelete(cost.id)}
          >
            <Image
              source={require("../assets/delete.png")}
              style={{ width: 20, height: 20 }}
            />
          </CTButton>
        ) : (
          <Text />
        )}

        {onEdit ? (
          <CTButton
            style={{ backgroundColor: "grey" }}
            onPress={() => onEdit()}
          >
            <Image
              source={require("../assets/edit.png")}
              style={{ width: 20, height: 20 }}
            />
          </CTButton>
        ) : (
          <Text />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#C0C0C0",
  },
  detailItem: {
    flex: 1,
    fontSize: 18,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cost;
