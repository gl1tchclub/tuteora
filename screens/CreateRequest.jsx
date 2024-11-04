import { View } from "react-native";
import CreateRequest from "../components/CreateRequest";

const CreateRequestScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
       <CreateRequest navigation={props.navigation}/>
    </View>
  );
};

export default CreateRequestScreen;