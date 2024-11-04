import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SessionWidget from "./SessionWidget";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Timesheet = ({ navigation }) => {
  const { profile } = useContext(UserContext);
  const [timesheets, setTimesheets] = useState([
    {
      id: 1,
      tutor: profile.firstName + " " + profile.lastName,
      student: "Janadsde Doe",
      topic: "Math",
      date: "11/9/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: true,
      isCompleted: true,
    },
    {
      id: 2,
      tutor: "John Doe",
      student: "Joseph Dunn",
      topic: "IT",
      date: "11/13/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: true,
      isCompleted: true,
    },
  ]);
};
