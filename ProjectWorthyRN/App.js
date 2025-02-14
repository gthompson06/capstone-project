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
container: {
  flex: 1,
  backgroundColor: "dodgerblue",
  alignItems: "center",
  justifyContent: "center",
 },
});

export default GridScreen;
