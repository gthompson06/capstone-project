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

const ScheduleItem = ({ schedule, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const styles = AppStyles;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this schedule?");
      if (confirmed) onDelete(schedule.scheduleId);
    } else {
      Alert.alert("Delete Schedule", "Are you sure you want to delete this schedule?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => onDelete(schedule.scheduleId),
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
            <Text style={styles.itemTitle}>{schedule.title}</Text>
            <Text style={styles.itemSubtitle}>Type: {schedule.type}</Text>
          </View>
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={22} color="black" />
        </TouchableOpacity>

        {expanded && (
          <View>
            <Text style={styles.itemDescription}>{schedule.description}</Text>
            <Text style={styles.itemDescription}>
              Time: {schedule.startTime} - {schedule.endTime}
            </Text>
            <Text style={styles.itemDescription}>Days: {schedule.days.join(", ")}</Text>
            <View style={styles.itemActions}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditSchedule", { schedule })}
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

const Schedules = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = AppStyles;

  const fetchSchedules = async () => {
    if (user?.userId) {
      try {
        const response = await fetch(`http://localhost:5161/schedules/${user.userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSchedules(data);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("No userId found");
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchSchedules(); }, []));

  const handleDelete = async (scheduleId) => {
    try {
      await fetch(`http://localhost:5161/schedules/${user.userId}/${scheduleId}`, {
        method: "DELETE",
      });
      setSchedules((prev) => prev.filter((s) => s.scheduleId !== scheduleId));
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
  };

  const scheduleCount = schedules.length;

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

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Schedules</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddSchedule", { scheduleCount })}>
          <Ionicons name="add" size={30} color="#1762a7" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : error ? (
            <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
          ) : (
            <FlatList
              data={schedules}
              keyExtractor={(item) => item.scheduleId.toString()}
              renderItem={({ item }) => (
                <ScheduleItem schedule={item} onDelete={handleDelete} />
              )}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedules;
