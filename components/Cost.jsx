import { View, StyleSheet, Text } from "react-native";

const Cost = ({ cost }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>{cost.title}</Text>
      <View>
        <Text style={styles.detailItem}>{cost.location}</Text>
        <Text style={styles.detailItem}>{cost.date}</Text>
        <Text style={styles.detailItem}>{cost.cost}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
