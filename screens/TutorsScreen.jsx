import { View } from "react-native";
import TutorList from "../components/TutorList";

const TutorListScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
       <TutorList navigation={props.navigation}/>
    </View>
  );
};

export default TutorListScreen;