import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

const TutorDetails = (props) => {
  const { profile, updateProfile } = useContext(UserContext);
  const [request, setRequest] = useState(null);
  const [topic, setTopic] = useState(null);
  const [icon, setIcon] = useState("account-arrow-right");
  const [msg, setMsg] = useState("Request Tutor");
  const tutor = props.tutor.tutor;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomColor = getRandomColor();

  const handleRequestTutor = (tutorId) => {
    setIcon("check");
    setMsg("Sent!");
    setRequest({
      id: profile.id,
      type: "student",
      student: `${profile.firstName} ${profile.lastName}`,
      study: profile.study,
      tutorId: tutorId,
      requestDate: new Date().toLocaleDateString(),
    });
    setTimeout(() => {
      props.navigation.navigate("Dashboard");
    }, 500);
  };

  return (
    <ScrollView className="flex-1 bg-white w-full">
      <View className="relative w-full h-48 mb-3">
        <View
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{ backgroundColor: randomColor, opacity: 0.6 }}
        />
        <View className="absolute bottom-0 left-0 flex-row justify-between w-full">
          <View
            className="rounded-lg m-6 border border-neutral-400/[0.1]"
            style={{
              backgroundColor: randomColor,
              shadowColor: "#00000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text className="text-2xl font-bold text-white px-2 py-1">
              {tutor.firstName} {tutor.lastName}
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex-1 justify-center">
        <TouchableOpacity
          onPress={() => handleRequestTutor(tutor.id)}
          className="bg-white rounded-2xl p-1 w-fit-content self-center m-2 flex-row items-center border border-neutral-400/[0.1]"
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 3,
          }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="black"
            style={{ paddingHorizontal: 4, paddingVertical: 2 }}
          />
          <Text className="text-black px-2 text-lg">{msg}</Text>
        </TouchableOpacity>
        <View className="border-b-neutral-400 border-b m-4">
          <Text className="text-xl mb-3 font-semibold">About Me</Text>
          <Text className="text-base mb-8">{tutor.bio || "No Bio"}</Text>
        </View>
        <View className="border-b-neutral-400 border-b mx-4 py-2">
          <View className="flex-row">
            <Text className="text-lg mb-3 font-semibold">Studying: </Text>
            <Text className="text-lg mb-3 ml-4">{tutor.study}</Text>
          </View>
          <View className="flex-row my-2 text-wrap">
            <Text className="text-lg font-semibold self-center mb-2">
              Topics:
            </Text>
            {tutor.topics ? (
              tutor.topics.map((topic, idx) => (
                <Text
                  key={idx}
                  className="mb-1 ml-2 bg-neutral-200 rounded-2xl p-2"
                >
                  {topic}
                </Text>
              ))
            ) : (
              <Text className="mb-1 bg-neutral-200 rounded-2xl p-2 ml-3">
                None
              </Text>
            )}
          </View>
        </View>
        <View className="border-b-neutral-400 border-b mx-4 py-3">
          <View className="flex-row">
            <Text className="text-xl font-semibold self-center">Availability:</Text>
            <View className="flex-row my-2 text-wrap">
              {tutor.availability ? (
                tutor.availability.map((day, idx) => (
                  <Text
                    key={idx}
                    className="ml-2 bg-neutral-200 rounded-2xl p-2"
                  >
                    {day}
                  </Text>
                ))
              ) : (
                <Text className="bg-neutral-200 rounded-2xl p-2 ml-3">
                  No Schedule Set
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TutorDetails;
