import React, {useEffect, useState} from 'react';
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
import Redirect from "../pages/Login/redirect";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin";
import AsyncStorage from "@react-native-async-storage/async-storage";


const {Navigator, Screen} = createStackNavigator();


function AppStack() {
    const [isSignin, setIsSignin] = useState("");

    /*useEffect(() => {
        setTimeout(() => {

        }, 1000);

        (async () => {
            const id = await AsyncStorage.getItem("id");

            if (id) {
                setIsSignin("Home");
            } else {
                setIsSignin("Login");
            }
        })();
    }, []);*/

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={"Redirect"}
            >

                <Screen name={"Redirect"} component={Redirect}/>
                <Screen name={"TabsBottom"} component={AppTabsBottom}/>
                <Screen
                    name={"Login"}
                    component={Login}
                />
                <Screen name={"Home"} component={Home}/>
                <Screen name={"Signup"} component={Signup}/>
                <Screen name={"view"} component={View}/>
                <Screen name={"viewProductService"} component={ViewProductService}/>
                <Screen name={"Checkout"} component={Checkout}/>
                <Screen name={"service"} component={Services} options={{
                    title: 'Listagem',
                    headerShown: true,
                }}/>
                <Screen name={"List"} component={List} options={{
                    title: "Listagem", headerShown: true
                }}/>
                <Screen name={"Admin"} component={Admin}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;