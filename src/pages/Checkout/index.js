import React, {useEffect, useState} from 'react';
import {useFocusEffect} from "@react-navigation/native";
import {Text} from "react-native";


function Checkout({navigation, route}) {
    const {id, title} = route.params;
    useEffect(() => {

    }, []);

    return (
        <>
            <Text>Finalizar Compra</Text>

            <Text>{title}</Text>
        </>
    );
}

export default Checkout;