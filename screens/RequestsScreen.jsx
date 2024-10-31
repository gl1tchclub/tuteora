import { View, Text } from "react-native";
import RequestsList from "../components/Requests";

const RequestsScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <RequestsList navigation={props.navigation}/>
    </View>
  );
};

export default RequestsScreen;