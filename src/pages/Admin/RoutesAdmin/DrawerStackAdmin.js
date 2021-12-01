import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import Home from '../pages/Home';
import React from 'react';
import Usuario from "../pages/Usuarios";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import CreateUser from "../pages/Usuarios/createUser";
import ViewUser from "../pages/Usuarios/viewUser";
import Produtos from "../pages/Produtos";
import ViewProduto from "../pages/Produtos/viewProduto";
import CreateProduto from "../pages/Produtos/createProduto";
import {List} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

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

            <Drawer.Screen
                options={{
                    title: "Produtos"
                }}
                name="produtos"
                component={Produtos}
            />

            <Drawer.Screen
                options={{
                    title: "Visualizar Produtos"
                }}
                name="view-produto"
                component={ViewProduto}
            />

            <Drawer.Screen
                options={{
                    title: "Cadastrar Produtos"
                }}
                name="create-produto"
                component={CreateProduto}
            />
        </Drawer.Navigator>
    );
}

/*const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="usuarios" component={Usuario}/>
        </Stack.Navigator>
    );
};*/

function CustomDrawerContent(props) {
    const width = useWindowDimensions().width * 0.3;

    return (
        <DrawerContentScrollView {...props}>
            {/*<DrawerItemList {...props} />*/}
            <DrawerItem
                label={() => (
                    <List.Item
                        style={styles.item}
                        title="Usuários"
                        left={props => <List.Icon {...props} icon="account-group"/>}
                    />
                )}
                onPress={() => props.navigation.navigate("usuarios")}
            />

            <DrawerItem
                label={() => (
                    <List.Item
                        style={styles.item}
                        title="Produtos"
                        left={props => <List.Icon {...props} icon="archive"/>}
                    />
                )}
                onPress={() => props.navigation.navigate("produtos")}
            />

            <DrawerItem
                label={() => (
                    <List.Item
                        style={styles.item}
                        title="Sair"
                        left={props => <List.Icon {...props} icon="logout"/>}
                    />
                )}
                onPress={() => props.navigation.navigate("Login")}
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

    item: {
        paddingVertical: 0,
    }
});