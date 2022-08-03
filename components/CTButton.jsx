import { TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const CTButton = (props) => {
  return (
    <TouchableOpacity {...props} style={{ ...styles.button, ...props.style }}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    width: "50%",
  },
});

export default CTButton;
