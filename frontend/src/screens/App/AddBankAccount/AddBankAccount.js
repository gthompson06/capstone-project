import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useAuth } from "../../../contexts/AuthContext";
import { useRoute } from "@react-navigation/native";
import { AppStyles } from "../../../styles/AppStyles";

const AddBankAccount = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();
  const { accountCount } = route.params || {};
  const styles = AppStyles;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async () => {
    const parsedBalance = parseFloat(balance);
    if (isNaN(parsedBalance)) {
      alert("Please enter a valid number for balance.");
      return;
    }

    const accountData = {
      userId: user.userId,
      accountId: accountCount + 1,
      title,
      description,
      type,
      balance: parsedBalance,
    };

    try {
      const response = await fetch("http://10.0.0.210:5161/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Account created:", data);
        navigation.goBack();
      } else {
        const errorText = await response.text();
        console.error("Error creating account:", errorText);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1762a7" />
      </TouchableOpacity>

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Add Account</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type (e.g. Checking, Savings)" />
        <CustomInput
          value={balance}
          setValue={setBalance}
          placeholder="Enter balance"
          keyboardType="numeric"
        />

        <CustomButton onPress={handleSubmit} text="Submit" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBankAccount;
