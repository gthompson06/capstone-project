import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccountItem = ({ account, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this account?");
      if (confirmed) onDelete(account.accountId);
    } else {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete this account?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            onPress: () => onDelete(account.accountId),
            style: "destructive",
          },
        ]
      );
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          maxWidth: 400,
          marginBottom: 10,
          padding: 12,
          borderRadius: 10,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <TouchableOpacity
          onPress={toggleExpand}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flexShrink: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{account.title}</Text>
            {/* Show balance in the header if not expanded */}
            <Text style={{ color: "gray", marginTop: 2 }}>
              {expanded ? `Type: ${account.type}` : `Balance: $${account.balance}`}
            </Text>
          </View>
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={22} color="black" />
        </TouchableOpacity>

        {expanded && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: "#444" }}>{account.description}</Text>
            <Text style={{ color: "#444", marginTop: 4 }}>Balance: ${account.balance}</Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditBankAccount", { account })}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: "#007bff", fontWeight: "500" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={{ color: "red", fontWeight: "500" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const Finances = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    if (user?.userId) {
      try {
        const response = await fetch(`http://localhost:5161/accounts/${user.userId}`);
        if (!response.ok) throw new Error("Failed to fetch accounts");

        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [])
  );

  const handleDelete = async (accountId) => {
    try {
      await fetch(`http://localhost:5161/accounts/${user.userId}/${accountId}`, {
        method: "DELETE",
      });
      setAccounts((prev) => prev.filter((acc) => acc.accountId !== accountId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <TouchableOpacity
        style={{ marginLeft: 15, marginTop: 10, padding: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", marginRight: 10 }}>
          Finances Screen
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddBankAccount", { accountCount: accounts.length })}>
          <Ionicons name="add" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
        ) : (
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.accountId.toString()}
            renderItem={({ item }) => (
              <AccountItem account={item} onDelete={handleDelete} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Finances;