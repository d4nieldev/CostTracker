import { View, Text, StyleSheet } from "react-native";

const HomeScreen = ({ route, navigation }) => {
  return <Text>This is {route.params.category} screen!</Text>;
};

export default HomeScreen;
