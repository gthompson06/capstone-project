// npm install @react-native-community/datetimepicker
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomInput from "../../../components/CustomInput";

const Stack = createStackNavigator();

const AddTask = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState("");

  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const [hasStartEnd, setHasStartEnd] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Add Task
        </Text>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />
        <CustomInput value={order} setValue={setOrder} placeholder="Enter order (e.g. 1, 2, 3)" />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Has Due Date</Text>
          <Switch value={hasDueDate} onValueChange={setHasDueDate} />
        </View>
        {hasDueDate && (
          <>
            <TouchableOpacity
              onPress={() => setShowDueDatePicker(true)}
              style={styles.datePickerBox}
            >
              <Text>
                {dueDate ? new Date(dueDate).toLocaleDateString() : "Select due date"}
              </Text>
            </TouchableOpacity>
            {showDueDatePicker && (
              <DateTimePicker
                value={dueDate ? new Date(dueDate) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDueDatePicker(false);
                  if (selectedDate) 
                    console.log("selected due date: ", selectedDate.toISOString().slice(0,10))
                    setDueDate(selectedDate.toISOString());
                }}
              />
            )}
          </>
        )}

        <View style={styles.switchRow}>
          <Text style={styles.label}>Has Start and End</Text>
          <Switch value={hasStartEnd} onValueChange={setHasStartEnd} />
        </View>
        {hasStartEnd && (
          <>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              style={styles.datePickerBox}
            >
              <Text>
                {startDate ? new Date(startDate).toLocaleDateString() : "Select start date"}
              </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate ? new Date(startDate) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate)
                    console.log("selected start date: ", selectedDate.toISOString().slice(0,10))
                    setStartDate(selectedDate.toISOString());
                }}
              />
            )}

            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              style={styles.datePickerBox}
            >
              <Text>
                {endDate ? new Date(endDate).toLocaleDateString() : "Select end date"}
              </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate ? new Date(endDate) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate)
                    console.log("selected end date: ", selectedDate.toISOString().slice(0,10))
                    setEndDate(selectedDate.toISOString());
                }}
              />
            )}
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
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    width: "75%",
    maxWidth: 450,
    marginVertical: 10,
  },
};

export default AddTask;
