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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuth } from "../../../contexts/AuthContext";
import CustomInput from "../../../components/CustomInput";
import { useRoute } from "@react-navigation/native";

const AddTask = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState("");

  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [hasStartEnd, setHasStartEnd] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const route = useRoute();
  const { lastTaskId } = route.params || {};

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

  const handleSubmit = async () => {
    const formatDate = (date) => {
      if (!date) return null;
      const dateObj = new Date(date);
      return dateObj.toISOString().split('T')[0];
    };
  
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
      const response = await fetch(`http://localhost:5161/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Task created:", data);
        navigation.goBack();
      } else {
        const errorText = await response.text();
        console.error("Error creating task:", errorText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  

  const formatDate = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return Platform.OS === "web"
      ? dateObj.toISOString().slice(0, 10)
      : dateObj.toLocaleDateString();
  };

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

        <View style={styles.switchRow}>
          <Text style={styles.label}>Has Due Date</Text>
          <Switch value={hasDueDate} onValueChange={setHasDueDate} />
        </View>

        {hasDueDate && (
          <>
            {Platform.OS === "web" ? (
              <View style={styles.datePickerBox}>
                <input
                  type="date"
                  value={dueDate ? new Date(dueDate).toISOString().slice(0, 10) : ""}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{ padding: 10, width: "100%" }}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowDueDatePicker(true)}
                style={styles.datePickerBox}
              >
                <Text>{formatDate(dueDate) || "Select due date"}</Text>
              </TouchableOpacity>
            )}

            {showDueDatePicker && Platform.OS !== "web" && (
              <DateTimePicker
                value={dueDate ? new Date(dueDate) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate, "dueDate")}
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
            {Platform.OS === "web" ? (
              <>
                <View style={styles.datePickerBox}>
                  <input
                    type="date"
                    value={startDate ? new Date(startDate).toISOString().slice(0, 10) : ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ padding: 10, width: "100%" }}
                  />
                </View>
                <View style={styles.datePickerBox}>
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
                <TouchableOpacity
                  onPress={() => setShowStartDatePicker(true)}
                  style={styles.datePickerBox}
                >
                  <Text>{formatDate(startDate) || "Select start date"}</Text>
                </TouchableOpacity>

                {showStartDatePicker && Platform.OS !== "web" && (
                  <DateTimePicker
                    value={startDate ? new Date(startDate) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, "startDate")}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setShowEndDatePicker(true)}
                  style={styles.datePickerBox}
                >
                  <Text>{formatDate(endDate) || "Select end date"}</Text>
                </TouchableOpacity>

                {showEndDatePicker && Platform.OS !== "web" && (
                  <DateTimePicker
                    value={endDate ? new Date(endDate) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, "endDate")}
                  />
                )}
              </>
            )}
          </>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 20,
            width: "75%",
            maxWidth: 450,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
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
