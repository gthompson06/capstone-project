import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
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
import { AppStyles } from "../../../styles/AppStyles";
import Logo from "../../../../assets/images/logo.png";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccountItem = ({ account, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const styles = AppStyles;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this account?");
      if (confirmed) onDelete(account.accountId);
    } else {
      Alert.alert("Delete Account", "Are you sure you want to delete this account?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => onDelete(account.accountId),
          style: "destructive",
        },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleExpand} style={styles.itemHeader}>
          <View style={styles.itemTitleContainer}>
            <Text style={styles.itemTitle}>{account.title}</Text>
            <Text style={styles.itemSubtitle}>
              {expanded ? `Type: ${account.type}` : `Balance: $${account.balance}`}
            </Text>
          </View>
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={22} color="black" />
        </TouchableOpacity>

        {expanded && (
          <View>
            <Text style={styles.itemDescription}>{account.description}</Text>
            <Text style={styles.itemDescription}>Balance: ${account.balance}</Text>
            <View style={styles.itemActions}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditBankAccount", { account })}
                style={styles.editButton}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const Finances = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = AppStyles;

  const fetchAccounts = async () => {
    if (user?.userId) {
      try {
        const response = await fetch(`http://10.0.0.210:5161/accounts/${user.userId}`);
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

  useFocusEffect(useCallback(() => { fetchAccounts(); }, []));

  const handleDelete = async (accountId) => {
    try {
      await fetch(`http://10.0.0.210:5161/accounts/${user.userId}/${accountId}`, {
        method: "DELETE",
      });
      setAccounts((prev) => prev.filter((acc) => acc.accountId !== accountId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
              <TouchableOpacity
                style={{ padding: 10, alignSelf: "flex-start" }}
                onPress={() => navigation.openDrawer()}
              >
                <Ionicons name="menu" size={50} color="#1762a7" />
              </TouchableOpacity>
              <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Finances</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddBankAccount", { accountCount: accounts.length })}
        >
          <Ionicons name="add" size={30} color="#1762a7" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.accountId.toString()}
              renderItem={({ item }) => <AccountItem account={item} onDelete={handleDelete} />}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Finances;
