import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../../components/CustomInput"; // update path if needed

const Stack = createStackNavigator();

const EditTask = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState("");
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [hasStartEnd, setHasStartEnd] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Edit Task
        </Text>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />

        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />

        <CustomInput value={type} setValue={setType} placeholder="Enter type" />

        <CustomInput
          value={order}
          setValue={setOrder}
          placeholder="Enter order (e.g. 1, 2, 3)"
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Has Due Date</Text>
          <Switch value={hasDueDate} onValueChange={setHasDueDate} />
        </View>
        {hasDueDate && (
          <>
            <CustomInput
              value={dueDate}
              setValue={setDueDate}
              placeholder="Enter due date"
            />
          </>
        )}

        <View style={styles.switchRow}>
          <Text style={styles.label}>Has Start and End</Text>
          <Switch value={hasStartEnd} onValueChange={setHasStartEnd} />
        </View>
        {hasStartEnd && (
          <>
            <CustomInput
              value={startDate}
              setValue={setStartDate}
              placeholder="Enter start date"
            />
            <CustomInput
              value={endDate}
              setValue={setEndDate}
              placeholder="Enter end date"
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginTop: 10,
    marginLeft: "12.5%",
  },
  switchRow: {
    width: "75%",
    maxWidth: 450,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
};

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
}
