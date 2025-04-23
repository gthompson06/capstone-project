import { StyleSheet } from "react-native";

export const AppStyles = StyleSheet.create({
    root: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    },
    container: {
        width: '100%',
        backgroundColor: '#1762a7',
        padding: "6%",
        alignItems: "center",
    },
    backArrow: {
        width: 40,
        height: 40,
    },
    header: {
        width: "100%",
        height: 60,
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    logo: {
        width: "10%",
        height: "100%",
        maxWidth: 300,
        marginRight: 10
    },
    detailsTitle: {
        color: "white",

    },
    headerLogo: {
        width: "16%",
    },
    title: {
        width: "90%",
        fontSize: 40,
        color: "white",
        textAlign: "center",
        marginTop: "6%",
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
    },


    dayDetailsContainer: {
        marginTop: "6%",
        width: "100%",
        alignContent: "left",
        backgroundColor: "#1762a7",
        paddingBottom: "60%"
    },
    date: {
        fontSize: 30,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        paddingBottom: "6%"
    },

    sectionContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#1762a7",
        width: "80%",
        padding: 15,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "left",
        color: "white",
        marginTop: "8%",
        fontSize: 21
    },
    scheduleItem: {
        marginBottom: 6,
        padding: "4%",
        borderBottomWidth: 1,
        backgroundColor: "white",
        borderRadius: 10
    },
    scheduleTitle: {
        fontWeight: "500",
        textAlign: "center",
        color: "black"
    },
    scheduleTime: {
        color: "#1762a7",
        textAlign: "center",
        marginTop: "2%"
    },
    taskContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        shadowColor: "#1762a7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 1,
        marginTop: "4%"
    },
    taskSelected: {
        opacity: 0.5,
    },
    taskText: {
        fontWeight: "500",
        textAlign: "center",
    },
    completeButton: {
        marginTop: 6,
        alignSelf: "center",
        width: "80%",
    },
    expenseText: {
        marginBottom: 6,
        textAlign: "center",
        color: "red",
        marginTop: "6%"
    },
    emptyText: {
        textAlign: "center",
        color: "white",
        paddingVertical: "8%"
    },

    itemContainer: {
        marginHorizontal: "6%",
        marginTop: "2%",
        backgroundColor: "white",
        borderRadius: 6,
        padding: 20
    },

    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",

    },

    itemTitleContainer: {
        flexShrink: 1,
        paddingRight: 10,
    },

    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
    },

    itemSubtitle: {
        color: "gray",
        marginTop: 2,
    },

    itemDescription: {
        color: "#444",
        lineHeight: 20,
        marginTop: 8,
    },

    itemActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },

    editButton: {
    },

    editText: {
        color: "green",
        fontWeight: "500",
    },

    deleteText: {
        color: "red",
        fontWeight: "500",
    },

    menuButton: {
        marginLeft: 15,
        marginTop: 10,
    },

    screenHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },

    screenTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginRight: 10,
        color: "#1762a7"
    },

    scrollContainer: {
        backgroundColor: "#1762a7",
        paddingVertical: "4%",
        height: "300%"
    },

    flatListContainer: {
        paddingBottom: 20,
    },
})