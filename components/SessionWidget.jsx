import { View, Text } from "react-native";

const SessionWidget = (props) => {
  return (
    <View className="bg-green-100 p-4 m-2 rounded-xl justify-between w-fit flex-1">
      <View className="justify-between flex-row">
        <View className="flex-row space-x-2 mb-4">
          {props.accountType === "Tutor" ? (
            <>
              <Text className="font-bold">Student:</Text>
              <Text>{props.student.name}</Text>
            </>
          ) : (
            <>
              <Text className="font-bold">Tutor:</Text>
              <Text>{props.tutor.name}</Text>
            </>
          )}
        </View>
        <View className="flex-row space-x-2">
          <Text className="font-bold">Date:</Text>
          <Text>{props.date}</Text>
        </View>
      </View>
      <View className="flex-1 justify-between flex-row">
        <View className="flex-row space-x-2">
          <Text className="font-bold">Location:</Text>
          <Text>{props.location}</Text>
        </View>
        <View className="flex-row space-x-2">
          <Text className="font-bold">Time:</Text>
          <Text>{props.time}</Text>
        </View>
      </View>
      {props.children}
    </View>
  );
};

export default SessionWidget;
