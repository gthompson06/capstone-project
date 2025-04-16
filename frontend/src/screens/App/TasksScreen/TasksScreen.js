import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {useAuth} from "../../../contexts/AuthContext"

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
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          maxWidth: 400,
          marginBottom: 10,
          padding: 12,
          borderRadius: 10,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <TouchableOpacity
          onPress={toggleExpand}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flexShrink: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{task.title}</Text>
            <Text style={{ color: "gray", marginTop: 2 }}>Due: {task.dueDate}</Text>
          </View>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={22}
            color="black"
          />
        </TouchableOpacity>

        {expanded && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: "#444", lineHeight: 20 }}>{task.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};


// const { userId } = useAuth();

const Tasks = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5161/tasks/${1007}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
        setLoading(false);
      });
  }, []);

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

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.taskId.toString()}
            renderItem={({ item }) => <TaskItem task={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Tasks;