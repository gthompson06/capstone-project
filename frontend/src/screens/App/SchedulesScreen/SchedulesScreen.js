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

const ScheduleItem = ({ schedule, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this schedule?");
      if (confirmed) {
        console.log("Confirmed delete for scheduleId:", schedule.scheduleId);
        onDelete(schedule.scheduleId);
      }
    } else {
      Alert.alert(
        "Delete Schedule",
        "Are you sure you want to delete this schedule?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            onPress: () => {
              console.log("Confirmed delete for scheduleId:", schedule.scheduleId);
              onDelete(schedule.scheduleId);
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
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{schedule.title}</Text>
            <Text style={{ color: "gray", marginTop: 2 }}>Type: {schedule.type}</Text>
          </View>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={22}
            color="black"
          />
        </TouchableOpacity>

        {expanded && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: "#444", lineHeight: 20 }}>{schedule.description}</Text>
            <Text style={{ color: "#444", marginTop: 4 }}>Frequency: {schedule.frequency}</Text>
            <Text style={{ color: "#444" }}>Time: {schedule.startTime} - {schedule.endTime}</Text>
            <Text style={{ color: "#444" }}>Days: {schedule.days.join(", ")}</Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditSchedule", { schedule })}
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

const Schedules = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    if (user?.userId) {
      console.log("Fetching schedules for userId:", user.userId);
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

  useFocusEffect(
    useCallback(() => {
      fetchSchedules();
    }, [])
  );

  const handleDelete = async (scheduleId) => {
    try {
      await fetch(`http://localhost:5161/schedules/${user.userId}/${scheduleId}`, {
        method: "DELETE",
      });
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.scheduleId !== scheduleId)
      );
    } catch (error) {
      console.error("Failed to delete schedule:", error);
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
          Schedules Screen
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddSchedule")}>
          <Ionicons name="add" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
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
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Schedules;