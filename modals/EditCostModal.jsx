import { Text, Modal } from "react-native";

const EditCostModal = (props) => {
  return (
    <Modal visible={props.visible}>
      <Text>Editing cost #{props.cost.id ? props.cost.id : ""}</Text>
    </Modal>
  );
};

export default EditCostModal;
