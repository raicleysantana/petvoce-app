import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#FFFFFF",
    },

    rowTitle: {
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#343a40",
    },

    form: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        paddingVertical : 10,
    },

    inputContainer: {
        marginBottom: 15,
    },

    input: {
        backgroundColor: "#FAFAFA",
        color: "#444",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
    },

    buttonContainer: {
        marginTop: 20,
    },

    buttonEnter: {
        backgroundColor: "#fbc02d",
        borderColor: "#b08400",
        borderRadius: 10,
        paddingVertical: 12,

    }


});

export default styles;