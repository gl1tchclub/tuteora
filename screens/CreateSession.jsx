import { View } from "react-native";
// import CreateSession from "../components/CreateSession";
import CreateSession from "../components/Sesh";

const CreateSessionScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
       <CreateSession navigation={props.navigation}/>
    </View>
  );
};

export default CreateSessionScreen;