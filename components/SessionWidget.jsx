import { View, Text } from "react-native";

const setDetails = (person) => {};

const SessionWidget = (props) => {
  return (
    <View className="bg-green-100 p-4 m-2 rounded-xl justify-between w-5/6 flex-row">
      <View className="flex-1 justify-between">
        <View className="flex-row space-x-2 mb-4">
          {props.accountType === "Tutor" ? (
            <>
              <Text className="font-bold mx-2">Student:</Text>
              <Text>{props.student}</Text>
            </>
          ) : (
            <>
              <Text className="font-bold">Tutor:</Text>
              <Text>{props.tutor}</Text>
            </>
          )}
        </View>
        <View className="flex-row space-x-2">
          <Text className="font-bold">Date:</Text>
          <Text className="">{props.date}</Text>
        </View>
      </View>
      <View className="flex-1 justify-between">
        <View className="flex-row space-x-2">
          <Text className="font-bold">Location:</Text>
          <Text>{props.location}</Text>
        </View>
        <View className="flex-row space-x-2">
          <Text className="font-bold">Time:</Text>
          <Text className="">{props.time}</Text>
        </View>
      </View>
      {props.children}
    </View>
  );
};

export default SessionWidget;
