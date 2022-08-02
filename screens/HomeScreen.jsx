import { View, Text, Button, StyleSheet } from "react-native";
import Cost from "../components/Cost";
import Names from "../constants/Names";
import CTButton from "../components/CTButton";

const HomeScreen = ({
  navigation: { navigate },
  categories,
  onAddCategory,
}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to CostTracker!</Text>
      <Cost
        cost="50"
        category="total"
        onShowHistory={() => navigate(Names.screens.history)}
      />
      <CTButton onPress={() => navigate(Names.screens.addCategory)}>
        <Text>Add a New Category</Text>
      </CTButton>

      {categories.map((c) => (
        <Text>{c.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    paddingBottom: 15,
  },
});

export default HomeScreen;
