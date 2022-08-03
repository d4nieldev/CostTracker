import { Text } from "react-native";

const LargeText = (props) => {
  return <Text style={{ fontSize: 22, ...props.style }}>{props.children}</Text>;
};

export default LargeText;
