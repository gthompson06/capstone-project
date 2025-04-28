// React and necessary hooks
import React, { useState, useEffect, useCallback } from "react";

// React Native components and libraries
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
  Alert,
} from "react-native";

// Icon library
import { Ionicons } from "@expo/vector-icons";

// Navigation hooks
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

// Custom authentication context to get the current user
import { useAuth } from "../../../contexts/AuthContext";

// App-wide styles
import { AppStyles } from "../../../styles/AppStyles";

// Logo image
import Logo from "../../../../assets/images/logo.png";

// Enable layout animation for Android devices
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Component to display a single Task Item
const TaskItem = ({ task, onDelete }) => {
  const [expanded, setExpanded] = useState(false); // Whether the task is expanded to show more details
  const navigation = useNavigation(); // Navigation object
  const { user } = useAuth(); // Get current user from context
  const styles = AppStyles; // Import styles

  // Toggle expanded state with animation
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Show confirmation dialog before deleting a task
  const confirmDelete = () => {
    if (Platform.OS === "web") {
      // Web version uses window.confirm
      const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmed) {
        console.log("Confirmed delete for taskId:", task.taskId);
        onDelete(task.taskId); // Call the delete handler
      }
    } else {
      // Mobile version uses Alert
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            console.log("Confirmed delete for taskId:", task.taskId);
            onDelete(task.taskId); // Call the delete handler
          },
          style: "destructive",
        },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        {/* Task header: title + due date + expand/collapse arrow */}
        <TouchableOpacity onPress={toggleExpand} style={styles.itemHeader}>
          <View style={styles.itemTitleContainer}>
            <Text style={styles.itemTitle}>{task.title}</Text>
            <Text style={styles.itemSubtitle}>Due: {task.dueDate}</Text>
          </View>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={22}
            color="black"
          />
        </TouchableOpacity>

        {/* Expanded task details: description + actions */}
        {expanded && (
          <View>
            <Text style={styles.itemDescription}>{task.description}</Text>

            <View style={styles.itemActions}>
              {/* Edit Button */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditTask", {
                    taskId: task.taskId,
                    userId: user.userId,
                  })
                }
                style={styles.editButton}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Main Tasks screen that shows all tasks
const Tasks = () => {
  const navigation = useNavigation(); // Navigation object
  const { user } = useAuth(); // Get current user from context
  const [tasks, setTasks] = useState([]); // List of tasks
  const [loading, setLoading] = useState(true); // Loading state
  const taskCount = tasks.length; // Number of tasks (optional, not used here)
  const styles = AppStyles; // Import styles

  // Fetch tasks from backend server
  const fetchTasks = async () => {
    if (user?.userId) {
      console.log("Fetching tasks for userId:", user.userId);
      try {
        const response = await fetch(`http://localhost:5161/tasks/${user.userId}`);
        const data = await response.json();
        setTasks(data); // Set the fetched tasks
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false); // Always stop loading indicator
      }
    } else {
      console.warn("No userId found");
      setLoading(false);
    }
  };

  // Automatically fetch tasks when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Handle deletion of a task
  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5161/tasks/${user.userId}/${taskId}`, {
        method: "DELETE",
      });
      // After successful deletion, update UI by filtering out the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header with menu button and logo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ padding: 10, alignSelf: "flex-start" }}
          onPress={() => navigation.openDrawer()} // Open navigation drawer
        >
          <Ionicons name="menu" size={50} color="#1762a7" />
        </TouchableOpacity>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title section with add button */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Tasks</Text>

        {/* Add Task button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTask", {
            lastTaskId: tasks.at(-1)?.taskId ?? 0, // Pass last task ID (or 0 if none)
          })}
        >
          <Ionicons name="add" size={30} color="#1762a7" />
        </TouchableOpacity>
      </View>

      {/* Main content area */}
      <ScrollView>
        <View style={styles.scrollContainer}>
          {/* Show loading spinner if still loading */}
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            // Otherwise, show the list of tasks
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.taskId.toString()} // Each task must have a unique key
              renderItem={({ item }) => (
                <TaskItem task={item} onDelete={handleDelete} />
              )}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tasks; // Export the Tasks screen
