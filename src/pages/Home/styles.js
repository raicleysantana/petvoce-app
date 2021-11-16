import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        borderBottomWidth: .3,
        borderBottomColor: "#999",
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },

    headerItems: {},

    logo: {
        width: 60,
        height: 60,
        resizeMode: "center",
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
        color: "tomato",
        fontSize: 16,
    },

});

export default styles;