import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const DayDetails = ({ selectedDate }) => {
 const formattedDate = selectedDate.format("dddd, MMMM D");

 // add fetch for tasks, schedule, expense here

 return (
  <SafeAreaView style={{ marginTop: 20 }}>
   <Text style={{ fontSize: 18, fontWeight: "bold" }}>{formattedDate}</Text>

   <Text style={{ marginTop: 10 }}>On your schedule:</Text>
   <Text>10:00 AM - 11:45 AM: Biology</Text>
   <Text>4:00 PM - 10:00 PM: Work</Text>

   <Text style={{ marginTop: 10 }}>Tasks:</Text>
   <Text>Due 11:59 PM: English Essay</Text>
   <Text>Gym</Text>

   <Text style={{ marginTop: 10 }}>Recurring expenses:</Text>
   <Text>$7.99: Amazon Prime Subscription</Text>
  </SafeAreaView>
 );
};

export default DayDetails;
