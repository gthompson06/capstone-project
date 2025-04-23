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
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AppStyles } from "../../../styles/AppStyles";

const EditBankAccount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { account } = route.params;
  const styles = AppStyles;

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
      const response = await fetch(`http://10.0.0.210:5161/accounts/${account.userId}/${account.accountId}`, {
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
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1762a7" />
      </TouchableOpacity>

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Edit Account</Text>
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

        <CustomButton onPress={handleUpdate} text="Save Changes" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditBankAccount;