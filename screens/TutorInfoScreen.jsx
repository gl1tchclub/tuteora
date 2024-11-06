import { View } from "react-native";
import TutorDetails from "../components/TutorDetails";

const TutorInfoScreen = (props) => {
    const tutor = props.route.params;
  return (
    <View className="flex-1 justify-center items-center">
       <TutorDetails tutor={tutor} navigation={props.navigation} />
    </View>
  );
};

export default TutorInfoScreen;