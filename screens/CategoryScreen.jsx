import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import CTButton from "../components/CTButton";

const HomeScreen = ({ navigation, category }) => {
  const renderCosts = (item) => {
    return <Cost cost={item} />;
  };

  return (
    <View>
      <FlatList
        data={category.items}
        renderItem={({ item }) => renderCosts(item)}
        keyExtractor={(item) => item.id}
      />

      <CTButton>
        <Text>+</Text>
      </CTButton>
    </View>
  );
};

export default HomeScreen;
