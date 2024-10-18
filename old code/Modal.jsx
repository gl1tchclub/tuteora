import { useState } from "react";
import { Button, View } from "react-native";
import { Modal } from "react-native";
import LoginForm from "../components/AuthForm";

const ModalComponent = ({ children, onClose, visible }) => {
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const toggleModal = () => {
  //     setIsModalVisible(!isModalVisible);
  //   };
  return (
    <View className="bg-slate-200 items-center justify-center flex-1">
      <Modal isVisible={visible} transparent={true} animationType="slide">
        <View className="p-2.5 w-4/5 rounded-md">
          {children}
          <View>
            <Button title="Enter" onPress={onClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalComponent;
