import { View, Text, Button } from "react-native";
import RequestsList from "../components/Requests";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const RequestsScreen = (props) => {
  const { profile } = useContext(UserContext);
  return (
    <View className="flex-1 justify-center items-center">
      <RequestsList />
      {(profile.accountType === "Student" && profile.associates == null) && (
        <View className="m-4">
          <Button
            title="Request A Tutor"
            onPress={props.navigation.navigate("CreateRequest")}
            color="#46ab61"
          />
        </View>
      )}
    </View>
  );
};

export default RequestsScreen;
