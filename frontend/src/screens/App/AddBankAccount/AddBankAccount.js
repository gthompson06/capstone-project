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
import { useAuth } from "../../../contexts/AuthContext";
import { useRoute } from "@react-navigation/native";

const AddBankAccount = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const route = useRoute();
    const { accountCount } = route.params || {};
  
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
        accountId: accountCount + 1, // Only if your DB expects client to provide
        title,
        description,
        type,
        balance: parsedBalance,
      };
  
      try {
        const response = await fetch("http://localhost:5161/accounts", {
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
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Add Account
        </Text>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type (e.g. Checking, Savings)" />
        <CustomInput
          value={balance}
          setValue={setBalance}
          placeholder="Enter balance"
          keyboardType="numeric"
        />

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

export default AddBankAccount;