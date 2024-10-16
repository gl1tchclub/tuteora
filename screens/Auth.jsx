import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import ModalComponent from "../components/Modal";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthScreen = ({ onLogin }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    // perform login
    // if successful:
    setModalVisible(false);
    onLogin(); // need this??
  };

  const handleRegister = () => {
    // perform login
    // if successful:
    // add success toast here
    setModalVisible(false);
  };

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
      <Text>Auth Screen</Text>
      <Button title="Login" onPress={openLogin} />
      <Button title="Register" onPress={openRegister} />

      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {isLogin ? (
          <LoginForm onSubmit={() => handleLogin} />
        ) : (
          <RegisterForm onSubmit={() => handleRegister} />
        )}
      </ModalComponent>
    </View>
  );
};

export default AuthScreen;
