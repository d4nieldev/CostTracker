import { View, StyleSheet, Text } from "react-native";

const Cost = ({ cost }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.detailItem}>{cost.title}</Text>
      <Text style={styles.detailItem}>{cost.location}</Text>
      <Text style={styles.detailItem}>{cost.cost}</Text>
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
});

export default Cost;
