import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#FFFFFF",
    },
    //"#3686e7"

    logoContainer: {
        alignItems: "center",
    },

    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 40,
    },

    form: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
    },

    painel: {
        marginTop: 50,
    },

    inputContainer: {
        marginBottom: 10,
    },

    input: {
        backgroundColor: "#FAFAFA",
        color: "#444",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 13,
        fontSize: 16,
    },

    buttonContainer: {
        marginTop: 20,
    },

    buttonEnter: {
        backgroundColor: "#fbc02d",
        borderColor: "#b08400",
        borderRadius: 10,
        paddingVertical: 13,

    }


});

export default styles;