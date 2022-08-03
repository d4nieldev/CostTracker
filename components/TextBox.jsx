import { TextInput, StyleSheet } from "react-native";

const TextBox = (props) => {
  return <TextInput {...props} style={{ ...styles.textbox, ...props.style }} />;
};

const styles = StyleSheet.create({
  textbox: {
    flex: 1,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 13,
    fontSize: 18,
    borderRadius: 10,
  },
});

export default TextBox;
