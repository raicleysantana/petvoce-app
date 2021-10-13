import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    header: {
        marginTop: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#999",
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerItems: {},

    logo: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },

    title: {
        color: "#444",
        fontWeight: "bold",
        fontSize: 16,
    },

    link: {
        color: "#63b0e8",
        fontSize: 16,
    },

});

export default styles;