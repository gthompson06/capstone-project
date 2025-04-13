import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Schedules = () => {
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5161/schedules/1013")
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Schedules Screen</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {schedules.map((schedule) => (
            <View key={schedule.ScheduleId} style={styles.scheduleCard}>
              <Text style={styles.title}>{schedule.Title}</Text>
              <Text>Description: {schedule.Description}</Text>
              <Text>Type: {schedule.Type}</Text>
              <Text>Frequency: {schedule.Frequency}</Text>
              <Text>Start Time: {schedule.StartTime}</Text>
              <Text>End Time: {schedule.EndTime}</Text>
              <Text>Days: {schedule.Days.join(", ")}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 25,
    paddingBottom: 30,
    paddingTop: 0,
  },
  scheduleCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Schedules;