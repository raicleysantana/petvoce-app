import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';

const {Navigator, Screen} = createMaterialBottomTabNavigator();

function AppTabsBottom() {
    return (
        <Navigator
            initialRouteName="Home"
            activeColor={"tomato"}
            inactiveColor="#444"
            barStyle={{backgroundColor: '#FFFFFF'}}
        >
            <Screen
                name={"Home"}
                component={Home}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />


            <Screen
                name={"Home1"}
                component={Home}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="map-marker-radius-outline" color={color} size={26}/>
                    ),
                }}
            />

            <Screen
                name={"Home2"}
                component={Home}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="shopping-outline" color={color} size={26}/>
                    ),
                }}
            />

            <Screen
                name={"Cart"}
                component={Cart}
                options={{
                    tabBarLabel: 'Carrinho',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={26}/>
                    ),
                }}
            />

            <Screen
                name={"profile"}
                component={Profile}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={26}/>
                    ),
                }}
            />

        </Navigator>
    )
}

export default AppTabsBottom;