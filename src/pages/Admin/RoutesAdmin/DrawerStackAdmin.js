import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import Home from '../pages/Home';
import React from 'react';
import Usuario from "../pages/Usuarios";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import CreateUser from "../pages/Usuarios/createUser";
import ViewUser from "../pages/Usuarios/viewUser";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerStackAdmin() {
    return (
        <MyDrawer/>
    );
}

function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                options={{
                    title: "Pagina Inicial"
                }} label={"Painel administrativo"}
                name="Home"
                component={Home}
            />
            <Drawer.Screen
                options={{
                    title: "Usuários"
                }}
                name="usuarios"
                component={Usuario}
            />

            <Drawer.Screen
                options={{
                    title: "Usuários"
                }}
                name="create-user"
                component={CreateUser}
            />

            <Drawer.Screen
                options={{
                    title: "Visualizar Usuários"
                }}
                name="view-user"
                component={ViewUser}
            />

        </Drawer.Navigator>
    );
}

const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="usuarios" component={Usuario}/>
        </Stack.Navigator>
    );
};

function CustomDrawerContent(props) {
    const width = useWindowDimensions().width * 0.3;

    return (
        <DrawerContentScrollView {...props}>
            {/*<DrawerItemList {...props} />*/}
            <DrawerItem
                label="Usuários"
                onPress={() => props.navigation.navigate("usuarios")}
            />
        </DrawerContentScrollView>
    );
}


export default DrawerStackAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    menuItemsCard: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    circleContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
    },
});