import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import ModalComponent from "../components/Modal";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openLogin = () => {
    setIsLogin(true);
    setModalVisible(true);
  };

  const openRegister = () => {
    setIsLogin(false);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Button title="Login" onPress={openLogin} />
      <Button title="Register" onPress={openRegister} />

      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {isLogin ? (
          <LoginForm onSubmit={() => setModalVisible(false)} />
        ) : (
          <RegisterForm onSubmit={() => setModalVisible(false)} />
        )}
      </ModalComponent>
      <Text>Home Screen</Text>
    </View>
  );
};

export default AuthScreen;
