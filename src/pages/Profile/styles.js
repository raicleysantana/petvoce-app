import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "center"
    },

    cardName: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    cardTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    }
});

export default styles;