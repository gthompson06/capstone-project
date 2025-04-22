import React, { useState, useEffect, useCallback } from "react";
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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { useFocusEffect } from '@react-navigation/native';

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskItem = ({ task, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth(); // Get the current user (including userId)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        console.log("Confirmed delete for taskId:", task.taskId);
        onDelete(task.taskId);
      }
    } else {
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            onPress: () => {
              console.log("Confirmed delete for taskId:", task.taskId);
              onDelete(task.taskId);
            },
            style: "destructive",
          },
        ]
      );
    }
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
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditTask", { taskId: task.taskId, userId: user.userId })}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: "#007bff", fontWeight: "500" }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmDelete}>
                <Text style={{ color: "red", fontWeight: "500" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};


const Tasks = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const taskCount = tasks.length;

  // Fetch tasks function
  const fetchTasks = async () => {
    if (user?.userId) {
      console.log("Fetching tasks for userId:", user.userId);
      try {
        const response = await fetch(`http://localhost:5161/tasks/${user.userId}`);
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No userId found");
      setLoading(false);
    }
  };

  // Call fetchTasks whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5161/tasks/${user.userId}/${taskId}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", marginRight: 10 }}>
          Tasks Screen
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("AddTask", { taskCount })}>
          <Ionicons name="add" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.taskId.toString()}
            renderItem={({ item }) => (
              <TaskItem task={item} onDelete={handleDelete} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Tasks;
