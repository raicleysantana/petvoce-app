import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Home from '../pages/Home';
import Login from '../pages/Login';
import AppTabsBottom from './AppTabsBottom';
import View from '../pages/ProductsServices/view';
import Services from "../pages/Services";
import ViewStore from "../pages/Store";

const {Navigator, Screen} = createStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={"Login"}
            >
                <Screen name={"Home"} component={Home}/>
                <Screen name={"Login"} component={Login}/>
                <Screen name={"view"} component={View}/>
                <Screen name={"view_store"} component={ViewStore}/>
                <Screen name={"TabsBottom"} component={AppTabsBottom}/>
                <Screen name={"service"} component={Services} options={{
                    title: 'Listagem',
                    headerShown: true,
                }}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;