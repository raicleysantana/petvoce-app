import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Home from '../pages/Home';
import Login from '../pages/Login';
import AppTabsBottom from './AppTabsBottom';
import View from '../pages/ProductsServices/view';

const {Navigator, Screen} = createStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={"TabsBottom"}
            >
                <Screen name={"Home"} component={Home}/>
                <Screen name={"Login"} component={Login}/>
                <Screen name={"view"} component={View}/>
                <Screen name={"TabsBottom"} component={AppTabsBottom}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;