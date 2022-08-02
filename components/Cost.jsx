import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const Cost = ({ category, cost, onShowHistory }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.spentText}>Spent {category}</Text>
      <TouchableOpacity style={styles.cost} onPress={onShowHistory}>
        <Text>{cost}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    padding: 10,
  },
  spentText: {
    fontSize: 20,
  },
  cost: {
    fontSize: 20,
    backgroundColor: Colors.accent,
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
  },
});

export default Cost;
