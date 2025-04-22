import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../../components/CustomInput";

const EditBankAccount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { account } = route.params;

  const [title, setTitle] = useState(account?.title || "");
  const [description, setDescription] = useState(account?.description || "");
  const [type, setType] = useState(account?.type || "");
  const [balance, setBalance] = useState(account?.balance?.toString() || "");

  const handleUpdate = async () => {
    const updatedAccount = {
      ...account,
      title,
      description,
      type,
      balance: parseFloat(balance),
    };

    try {
      const response = await fetch(`http://localhost:5161/accounts/${account.userId}/${account.accountId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAccount),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Account updated:", data);
        navigation.goBack();
      } else {
        const errorText = await response.text();
        console.error("Error updating account:", errorText);
      }
    } catch (error) {
      console.error("Error updating account:", error);
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
          Edit Account
        </Text>

        <CustomInput value={title} setValue={setTitle} placeholder="Enter title" />
        <CustomInput value={description} setValue={setDescription} placeholder="Enter description" />
        <CustomInput value={type} setValue={setType} placeholder="Enter type" />
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
          onPress={handleUpdate}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditBankAccount;