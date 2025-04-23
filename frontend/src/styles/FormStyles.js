import { StyleSheet } from "react-native";

export const FormStyles = StyleSheet.create({
    root: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1762a7",
    },
    container: {
      width: '94%',
      height: "96%",
      backgroundColor: '#fff',
      padding: "4%",
      alignItems: "center",
      borderRadius: 12,
      shadowColor: 'black',
      shadowOpacity: 0.6,
      shadowRadius: 10,
    },
    backArrow: {
      width: 40,
      height: 40,
    },
    logo: {
      width: "50%",
      maxWidth: 300,
    },
    header: {
        width: "100%",
        height: "6%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    headerLeft: {

    },
    headerLogo: {
      width: "16%",
    },
    title: {
      width: "90%",
      fontSize: 26,
      fontStyle: "italic",
      color: "#1762a7",
      textAlign: "center",
      marginBottom: "10%"
    },
    row: {
      display: "flex",
      flexDirection: "row",
      height: "10%",
      width: "90%",
      alignItems: "center",
      justifyContent: "space-around",
    },
    linkContainer: {
      height: "100%",
      width: "50%",
      alignItems: "center",
      justifyContent: "space-around",
    },
    linkText: {
      fontSize: 16,
      color: "#1762a7",
    },
    picker: {
      height: "10%",
      width: "90%"
    },
    error: {
        color: "red",
        marginBottom: 10.
    },
    input: {
        marginBottom: "4%",
        width: '90%',
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
     },
     question: {
        fontWeight: "bold",
        marginBottom: "10%"
     }
  })