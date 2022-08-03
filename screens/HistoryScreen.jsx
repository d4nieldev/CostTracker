import { View, Text, StyleSheet, FlatList } from "react-native";
import Cost from "../components/Cost";
import LargeText from "../components/LargeText";

const HistoryScreen = ({ categories }) => {
  const renderItems = (category) => {
    return (
      <View style={styles.categoryContainer}>
        <LargeText style={{ backgroundColor: category.color }}>
          {category.name}
        </LargeText>
        {category.items.map((cost) => (
          <Cost cost={cost} />
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => renderItems(item)}
      keyExtractor={(item) => item.name}
    />
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 15,
  },
});

export default HistoryScreen;
