import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#3686e7",
    },

    logoContainer: {
        alignItems: "center",
    },

    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 20,
    },

    form: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
    },

    inputContainer: {
        marginBottom: 20,
    },

    input: {
        color: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
    },

    buttonContainer: {},

    buttonEnter: {
        backgroundColor: "#fbc02d",
        borderColor: "#b08400",
        borderRadius: 8,
        paddingVertical: 12,

    }


});

export default styles;