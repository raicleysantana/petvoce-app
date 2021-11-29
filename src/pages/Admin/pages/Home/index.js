import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from "@react-navigation/drawer";
import {Linking, useWindowDimensions, StyleSheet, View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Usuario from "../Usuarios";
import Feather from "react-native-vector-icons/Feather";

const Drawer = createDrawerNavigator();

function Home(props) {
    return (
        <Text>Olá</Text>
    );
}

export default Home;

