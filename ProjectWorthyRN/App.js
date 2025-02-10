import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const GridScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Row 1 */}
        <View style={styles.row}>
          <View style={[styles.col, styles.col6, { height: 150 }]}>
            <Text style={styles.text}> Header </Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <View style={[styles.col, styles.col4, { height: 650 }]}>
            <Text style={styles.text}>Col 4 (Height 180)</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  col: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 20,
    borderRadius: 5,
  },
  col12: { width: "50%" },
  col6: { width: "100%" },
  col4: { width: "31%" },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});

export default GridScreen;
