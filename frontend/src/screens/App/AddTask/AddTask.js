// Import necessary libraries and components
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuth } from "../../../contexts/AuthContext"; // Auth context to get user info
import CustomInput from "../../../components/CustomInput"; // Custom input field
import CustomButton from "../../../components/CustomButton/CustomButton"; // Custom button
import { AppStyles } from "../../../styles/AppStyles"; // App-wide styling

const AddTask = () => {
  // Get user information from auth context
  const { user } = useAuth();
  // Get navigation and route utilities
  const navigation = useNavigation();
  const route = useRoute();
  // Import app styles
  const styles = AppStyles;

  // Set up states for task form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState("");

  // States for due dates and start/end dates
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [hasStartEnd, setHasStartEnd] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // States to control visibility of date pickers
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Get the last taskId passed from the previous screen (if any)
  const { lastTaskId } = route.params || {};

  // Handles changes when user selects a date
  const handleDateChange = (event, selectedDate, dateType) => {
    if (dateType === "dueDate") {
      setShowDueDatePicker(false);
      if (selectedDate) setDueDate(selectedDate.toISOString());
    } else if (dateType === "startDate") {
      setShowStartDatePicker(false);
      if (selectedDate) setStartDate(selectedDate.toISOString());
    } else if (dateType === "endDate") {
      setShowEndDatePicker(false);
      if (selectedDate) setEndDate(selectedDate.toISOString());
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Format a date to YYYY-MM-DD
    const formatDate = (date) => {
      if (!date) return null;
      const dateObj = new Date(date);
      return dateObj.toISOString().split("T")[0];
    };

    // Create a task object with all input data
    const taskData = {
      userId: user.userId,
      taskId: lastTaskId + 1,
      title,
      description,
      type,
      hasDueDate: hasDueDate && !!dueDate,
      dueDate: hasDueDate && dueDate ? formatDate(dueDate) : null,
      hasStartAndEnd: hasStartEnd && !!startDate && !!endDate,
      startDate: hasStartEnd && startDate ? formatDate(startDate) : null,
      endDate: hasStartEnd && endDate ? formatDate(endDate) : null,
      isCompleted: false,
      order: parseInt(order, 10) || 0,
    };

    try {
      // Send the task data to backend API via POST request
      const response = await fetch("http://localhost:5161/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        // If successful, go back to previous screen
        navigation.goBack();
      } else {
        // If error, print error message
        const errorText = await response.text();
        console.error("Error creating task:", errorText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Component rendering
  return (
    <SafeAreaView style={styles.root}>
      {/* Back button */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1762a7" />
      </TouchableOpacity>

      {/* Screen header */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Add Task</Text>
      </View>

      {/* Scrollable form content */}
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
        {/* Form inputs */}
        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />

        {/* Toggle for due date */}
        <View style={localStyles.switchRow}>
          <Text style={localStyles.label}>Has Due Date</Text>
          <Switch value={hasDueDate} onValueChange={setHasDueDate} />
        </View>

        {/* Due date input (only shown if hasDueDate is true) */}
        {hasDueDate && (
          <>
            {Platform.OS === "web" ? (
              // On web, use regular HTML input for date
              <View style={localStyles.datePickerBox}>
                <input
                  type="date"
                  value={dueDate ? new Date(dueDate).toISOString().slice(0, 10) : ""}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{ padding: 10, width: "100%" }}
                />
              </View>
            ) : (
              <>
                {/* On mobile, use DateTimePicker */}
                <TouchableOpacity
                  onPress={() => setShowDueDatePicker(true)}
                  style={localStyles.datePickerBox}
                >
                  <Text>{formatDate(dueDate) || "Select due date"}</Text>
                </TouchableOpacity>
                {showDueDatePicker && (
                  <DateTimePicker
                    value={dueDate ? new Date(dueDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, "dueDate")}
                  />
                )}
              </>
            )}
          </>
        )}

        {/* Toggle for start and end date */}
        <View style={localStyles.switchRow}>
          <Text style={localStyles.label}>Has Start and End</Text>
          <Switch value={hasStartEnd} onValueChange={setHasStartEnd} />
        </View>

        {/* Start and End date inputs (only shown if hasStartEnd is true) */}
        {hasStartEnd && (
          <>
            {Platform.OS === "web" ? (
              <>
                <View style={localStyles.datePickerBox}>
                  <input
                    type="date"
                    value={startDate ? new Date(startDate).toISOString().slice(0, 10) : ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ padding: 10, width: "100%" }}
                  />
                </View>
                <View style={localStyles.datePickerBox}>
                  <input
                    type="date"
                    value={endDate ? new Date(endDate).toISOString().slice(0, 10) : ""}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ padding: 10, width: "100%" }}
                  />
                </View>
              </>
            ) : (
              <>
                {/* Mobile pickers for start and end dates */}
                <TouchableOpacity
                  onPress={() => setShowStartDatePicker(true)}
                  style={localStyles.datePickerBox}
                >
                  <Text>{formatDate(startDate) || "Select start date"}</Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate ? new Date(startDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, "startDate")}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setShowEndDatePicker(true)}
                  style={localStyles.datePickerBox}
                >
                  <Text>{formatDate(endDate) || "Select end date"}</Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate ? new Date(endDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, "endDate")}
                  />
                )}
              </>
            )}
          </>
        )}

        {/* Submit button */}
        <CustomButton onPress={handleSubmit} text="Submit" />
      </ScrollView>
    </SafeAreaView>
  );
};

// Local styles for label, switches, and date pickers
const localStyles = {
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
    marginBottom: 30,
  },
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    width: "75%",
    maxWidth: 450,
    marginBottom: 30,
  },
};

export default AddTask;
