import React, {useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator, View} from "react-native";

const Redirect = ({navigation}) => {
    useEffect(() => {
        (async () => {
            const id = await AsyncStorage.getItem("id");
            if (id) {
                await navigation.navigate("TabsBottom");
            } else {
                await navigation.navigate("Login");
            }
        })();
    });

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator color={"tomato"} size={40}/>
        </View>);
}

export default Redirect;