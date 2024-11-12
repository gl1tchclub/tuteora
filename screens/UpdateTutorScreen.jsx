import { View } from "react-native";
import UpdateTutor from "../components/UpdateTutor";

const UpdateTutorScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <UpdateTutor navigation={props.navigation}/>
    </View>
  );
};

export default UpdateTutorScreen;
