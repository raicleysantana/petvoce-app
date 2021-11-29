import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator, View} from "react-native";

function Redirect({navigation}) {

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const id = await AsyncStorage.getItem("id");
        console.log(id);

        if (id) {
            console.log('ok');
            await navigation.navigate("TabsBottom");
        } else {
            await navigation.navigate("Login");
        }
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator color={"tomato"} size={40}/>
        </View>);
}

export default Redirect;