import { View, Text, FlatList, StyleSheet, Modal } from "react-native";

const CategoriesMenu = (props) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: item.color, ...styles.categoryView }}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <Modal animationType="slide" visible={false} style={styles.modal}>
      <View style={styles.container}>
        <FlatList
          data={props.categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
  },
  categoryView: {
    width: "100%",
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    margin: 15,
  },
});

export default CategoriesMenu;
