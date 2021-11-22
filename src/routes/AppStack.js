import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AppTabsBottom from './AppTabsBottom';
import View from '../pages/ProductsServices/view';
import Services from "../pages/Services";
import ViewProductService from "../pages/ProductsServices/view";
import List from "../pages/ListProductsServices";
import {Provider} from '../context/loginContext';

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
                <Screen name={"Signup"} component={Signup}/>
                <Screen name={"view"} component={View}/>
                <Screen name={"viewProductService"} component={ViewProductService}/>
                <Screen name={"TabsBottom"} component={AppTabsBottom}/>
                <Screen name={"service"} component={Services} options={{
                    title: 'Listagem',
                    headerShown: true,
                }}/>
                <Screen name={"List"} component={List} options={{
                    title: "Listagem", headerShown: true
                }}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default () => {
    return (
        <Provider>
            <AppStack/>
        </Provider>
    );
};