import React, { useState, useEffect } from "react";
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

import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AppStyles } from "../../../styles/AppStyles";

const EditTask = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId, userId } = route.params || {};
  const styles = AppStyles;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState("");
  const [hasDueDate, setHasDueDate] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [hasStartEnd, setHasStartEnd] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    if (!userId || !taskId) {
      console.error("Missing userId or taskId!");
      return;
    }

    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://10.0.0.210:5161/tasks/${taskId}`);
        const task = await response.json();
        setTitle(task.title);
        setDescription(task.description);
        setType(task.type);
        setOrder(task.order.toString());
        setHasDueDate(task.hasDueDate);
        setDueDate(task.dueDate);
        setHasStartEnd(task.hasStartAndEnd);
        setStartDate(task.startDate);
        setEndDate(task.endDate);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId, userId]);

  const formatDate = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return Platform.OS === "web"
      ? dateObj.toISOString().slice(0, 10)
      : dateObj.toLocaleDateString();
  };

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
    if (!taskId || !userId) {
      console.error("Missing taskId or userId.");
      return;
    }

    const formatDate = (date) => {
      if (!date) return null;
      const dateObj = new Date(date);
      return dateObj.toISOString().split("T")[0];
    };

    const taskData = {
      userId,
      taskId,
      title,
      description,
      type,
      hasDueDate: hasDueDate && !!dueDate,
      dueDate: hasDueDate && dueDate ? formatDate(dueDate) : null,
      hasStartAndEnd: hasStartEnd && !!startDate && !!endDate,
      startDate: hasStartEnd && startDate ? formatDate(startDate) : null,
      endDate: hasStartEnd && endDate ? formatDate(endDate) : null,
      order: parseInt(order, 10) || 0,
    };

    try {
      const response = await fetch(`http://10.0.0.210:5161/tasks/${userId}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        const errorText = await response.text();
        console.error("Error updating task:", errorText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1762a7" />
      </TouchableOpacity>

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Edit Task</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />
        <CustomInput value={order} setValue={setOrder} placeholder="Enter order (e.g. 1, 2, 3)" />

        <View style={localStyles.switchRow}>
          <Text style={localStyles.label}>Has Due Date</Text>
          <Switch value={hasDueDate} onValueChange={setHasDueDate} />
        </View>

        {hasDueDate && (
          Platform.OS === "web" ? (
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
          )
        )}

        <View style={localStyles.switchRow}>
          <Text style={localStyles.label}>Has Start and End</Text>
          <Switch value={hasStartEnd} onValueChange={setHasStartEnd} />
        </View>

        {hasStartEnd && (
          Platform.OS === "web" ? (
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
          )
        )}

        <CustomButton onPress={handleSubmit} text="Submit" />
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default EditTask;
