import React, {useEffect, useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../pages/Login";
import DrawerStack from "./DrawerStackAdmin";
import {NavigationContainer} from "@react-navigation/native";
import Usuario from "../pages/Usuarios";

const {Navigator, Screen} = createStackNavigator();

function AppStackAdmin() {
    return (
        <NavigationContainer independent={true}>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={"Login"}
            >
                <Screen name={"Login"} component={Login}/>
                <Screen name={"Drawer"} component={DrawerStack}/>
              {/*  <Screen name={"Usuarios"} component={Usuario}/>*/}
            </Navigator>
        </NavigationContainer>

    );
}

export default AppStackAdmin;