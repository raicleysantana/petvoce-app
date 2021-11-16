import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Avatar, ListItem, Rating} from "react-native-elements";
import api from "../../services/api";

function Cart({navigation, route}) {

    useEffect(() => {

    }, []);


    return (
        <View style={styles.container}>
            <Text>Carrinho</Text>
        </View>
    );
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
})