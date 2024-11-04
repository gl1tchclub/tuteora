import { View, Text } from "react-native";

const SessionWidget = (props) => {
  return (
    <View className="bg-green-100 p-3 my-2 rounded-xl">
      <View className="flex-row justify-between mb-4">
        {props.accountType === "Tutor" ? (
          <>
            <Text className="font-bold mx-2">Student:</Text>
            <Text>{props.student}</Text>
          </>
        ) : (
          <>
            <Text className="font-bold mx-2">Tutor:</Text>
            <Text>{props.tutor}</Text>
          </>
        )}
        <Text className="font-bold ml-4 mr-2">Location:</Text>
        <Text>{props.location}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="font-bold ml-2">Date:</Text>
        <Text>{props.date}</Text>
        <Text className="font-bold pl-9">Time:</Text>
        <Text>{props.time}</Text>
      </View>
      {props.children}
    </View>
  );
};

export default SessionWidget;
