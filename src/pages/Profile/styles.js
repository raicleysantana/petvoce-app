import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 20
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
    },

    options: {
        flex: 1,
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 15
    }
});

export default styles;