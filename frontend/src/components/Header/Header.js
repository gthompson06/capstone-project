import { StyleSheet, View } from "react-native";
import Logo from "../../../assets/images/logo.png"

const Header = ({ children }) => {


    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
})


export default Header;
