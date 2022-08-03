import { View, Text, StyleSheet } from "react-native";

const HomeScreen = ({ navigation, category }) => {
  return <Text>This is {category.name} screen!</Text>;
};

export default HomeScreen;
