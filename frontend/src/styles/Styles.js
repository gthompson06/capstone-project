import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CreateAccountStyles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  button: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
  },
});

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
    height: 40
  },
  logo: {
    width: "50%",
    maxWidth: 300,
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
  }
})

export const SecurityQuestionStyles = StyleSheet.create({
  questions: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
});

export const ResetPasswordStyles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
