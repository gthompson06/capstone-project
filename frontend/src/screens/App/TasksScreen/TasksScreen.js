import React, { useState, useEffect, useCallback } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { AppStyles } from "../../../styles/AppStyles";
import Logo from "../../../../assets/images/logo.png";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskItem = ({ task, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth(); // Get the current user (including userId)
  const styles = AppStyles;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmed) {
        console.log("Confirmed delete for taskId:", task.taskId);
        onDelete(task.taskId);
      }
    } else {
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            console.log("Confirmed delete for taskId:", task.taskId);
            onDelete(task.taskId);
          },
          style: "destructive",
        },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.itemContainer}>
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

        {expanded && (
          <View>
            <Text style={styles.itemDescription}>{task.description}</Text>
            <View style={styles.itemActions}>
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

const Tasks = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const taskCount = tasks.length;
  const styles = AppStyles;

  // Fetch tasks function
  const fetchTasks = async () => {
    if (user?.userId) {
      console.log("Fetching tasks for userId:", user.userId);
      try {
        const response = await fetch(`http://10.0.0.210:5161/tasks/${user.userId}`);
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
      await fetch(`http://10.0.0.210:5161/tasks/${user.userId}/${taskId}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ padding: 10, alignSelf: "flex-start" }}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={50} color="#1762a7" />
        </TouchableOpacity>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View
        style={styles.screenHeader}
      >
        <Text style={styles.screenTitle}>
          Tasks
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddTask", { taskCount })}
        >
          <Ionicons name="add" size={30} color="#1762a7" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.taskId.toString()}
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

export default Tasks;
