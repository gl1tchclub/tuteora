/**
 * SessionWidget component displays session details, such as the participant's name, topic, date, location, and time.
 * It is used to present a session's key information, and can render additional content passed via children props.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.accountType - The account type, either "Tutor" or "Student".
 * @param {Object} [props.student] - The student object with session details.
 * @param {Object} [props.tutor] - The tutor object with session details.
 * @param {Object} [props.creator] - The creator of the session (either student or tutor).
 * @param {string} props.topic - The topic of the session.
 * @param {string} props.date - The date of the session.
 * @param {string} props.location - The location of the session.
 * @param {string} props.time - The time of the session.
 * @param {React.ReactNode} props.children - Optional children elements to render within the widget.
 * 
 * @returns {JSX.Element} The rendered component.
 */

import { View, Text } from "react-native";

const SessionWidget = (props) => {
  return (
    <View className="flex-1">
      <View className="flex-row ml-4">
        {props.accountType === "Tutor" ? (
          <>
            <Text
              className="font-bold text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.student?.name || props.creator.name}
            </Text>
          </>
        ) : (
          <>
            <Text
              className="font-bold text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.tutor?.name || props.creator.name}
            </Text>
          </>
        )}
      </View>
      <View className="bg-green-100 p-4 m-2 rounded-xl justify-between w-fit flex-1">
        <View className="justify-between flex-row">
          <View className="flex-row space-x-2 mb-4">
            <Text className="font-bold">Topic:</Text>
            <Text>{props.topic}</Text>
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
    </View>
  );
};

export default SessionWidget;
