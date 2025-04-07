import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskItem = ({ task }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        marginHorizontal: 700,
        marginBottom: 15,
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <TouchableOpacity onPress={toggleExpand} style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{task.title}</Text>
          <Text style={{ color: "gray", marginTop: 2 }}>Due: {task.dueDate}</Text>
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} color="black" />
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "#444" }}>{task.description}</Text>
        </View>
      )}
    </View>
  );
};

const Tasks = () => {
  const navigation = useNavigation();

  const taskData = [
    {
      id: "1",
      title: "Finish Project",
      dueDate: "April 10, 2025",
      description: "Complete all tasks and submit the final report.",
    },
    {
      id: "2",
      title: "Team Meeting",
      dueDate: "April 8, 2025",
      description: "Discuss deliverables and next sprint goals.",
    },
    {
      id: "3",
      title: "Submit Homework",
      dueDate: "April 7, 2025",
      description: "Complete and upload before 11:59 PM.",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
  <TouchableOpacity
    style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
    onPress={() => navigation.openDrawer()}
  >
    <Ionicons name="menu" size={30} color="black" />
  </TouchableOpacity>

  <Text style={{ textAlign: "center", fontSize: 25, paddingVertical: 20 }}>
    Tasks Screen
  </Text>

  {/* Wrap FlatList in a flex: 1 View */}
  <View style={{ flex: 1 }}>
    <FlatList
      data={taskData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} />}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  </View>
</SafeAreaView>

  );
};

export default Tasks;
