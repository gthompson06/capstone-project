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
  const [dueDate, setDueDate] = useState("");
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const [hasStartEnd, setHasStartEnd] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const route = useRoute();
  const { taskCount } = route.params || {};

  const handleSubmit = async () => {
    const taskData = {
      userId: user.userId,
      taskId: taskCount + 1,
      title,
      description,
      type,
      hasDueDate: hasDueDate && !!dueDate,
      dueDate: hasDueDate && dueDate ? new Date(dueDate).toISOString() : null,
    
      hasStartAndEnd: hasStartEnd && !!startDate && !!endDate,
      startDate: hasStartEnd && startDate ? new Date(startDate).toISOString() : null,
      endDate: hasStartEnd && endDate ? new Date(endDate).toISOString() : null,
    
      isCompleted: false,
      order: parseInt(order, 10) || 0,
    };
  
    try {
      const response = await fetch(`http://localhost:5161/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Task created:', data);
        navigation.goBack();
      } else {
        const errorText = await response.text();
        console.error('Error creating task:', errorText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
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
                  if (selectedDate) {
                    console.log("selected due date:", selectedDate.toISOString().slice(0, 10));
                    setDueDate(selectedDate.toISOString());
                  }
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
                  if (selectedDate) {
                    console.log("selected start date:", selectedDate.toISOString().slice(0, 10));
                    setStartDate(selectedDate.toISOString());
                  }
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
                  if (selectedDate) {
                    console.log("selected end date:", selectedDate.toISOString().slice(0, 10));
                    setEndDate(selectedDate.toISOString());
                  }
                }}
              />
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
