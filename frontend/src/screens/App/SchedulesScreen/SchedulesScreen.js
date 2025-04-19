import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"; // Import this hook
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Schedules = ({ route }) => {
  const navigation = useNavigation(); // Use this to get the correct navigation object

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
            <Text style={{ color: "#444", lineHeight: 20 }}>
              {schedule.description}
            </Text>
            <Text style={{ color: "#444", marginTop: 4 }}>
              Frequency: {schedule.frequency}
            </Text>
            <Text style={{ color: "#444" }}>
              Time: {schedule.startTime} - {schedule.endTime}
            </Text>
            <Text style={{ color: "#444" }}>
              Days: {schedule.days.join(", ")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

// const Schedules = () => {
//   const navigation = useNavigation();
//   const { user } = useAuth(); 
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   console.log("User in Schedules:", user); // <- add this
//   useEffect(() => {
//     const fetchSchedules = async () => {
//       if (user?.userId) {
//         console.log("Fetching schedules for userId:", user.userId); // <- add this
//         try {
//           const response = await fetch(`http://localhost:5162/schedules/${user.userId}`

//           );

//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }

//           const data = await response.json();
//           setSchedules(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchSchedules();
//   }, [user]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
//       <TouchableOpacity
//         style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
//         onPress={() => navigation.openDrawer()} // Now this works
//       >
//         <Ionicons name="menu" size={30} color="black" />
//       </TouchableOpacity>

//       <Text
//         style={{
//           textAlign: "center",
//           fontSize: 25,
//           paddingBottom: 30,
//           paddingTop: 0,
//         }}
//       >
//         Schedules Screen
//       </Text>
//     </SafeAreaView>
//   );
// };

export default function HomeStack() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text style={{ textAlign: "center", fontSize: 25, paddingVertical: 20 }}>
        Schedules Screen
      </Text>

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
        ) : (
          <FlatList
            data={schedules}
            keyExtractor={(item) => item.scheduleId.toString()}
            renderItem={({ item }) => <ScheduleItem schedule={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}