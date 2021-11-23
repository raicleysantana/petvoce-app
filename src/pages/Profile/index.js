import React, {useEffect, useState} from 'react';
import {Card, Avatar, Text, ListItem, Icon} from 'react-native-elements'
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Index({navigation}) {
    const [cliente, setCliente] = useState([]);
    const [nome, setNome] = useState("");

    useEffect(() => {
        loadClient();
    }, []);

    async function loadClient() {
        const id = await AsyncStorage.getItem("id");

        const response = await api.get("cliente", {
            params: {id}
        });

        if (response.data) {
            await setCliente(response.data);
            setNome(response.data.cli_nome);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem("id");
        await navigation.navigate("Login");
    };

    const list = [
        {
            title: 'Configurações',
            icon: 'settings'
        },
        {
            title: 'Politicas de Privacidade',
            icon: 'file-text'
        },
        {
            title: 'Sair',
            icon: 'log-out',
            onPress: logout,
        },
    ];

    return (
        <>
            <Card>
                <View style={styles.cardHeader}>
                    <View>
                        <Avatar
                            rounded
                            size="large"
                            title="RS"
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                            }}
                        />
                    </View>
                    <View style={styles.cardName}>
                        <Text style={styles.cardTitle}>{nome.toUpperCase()}</Text>
                    </View>
                </View>
            </Card>

            <View style={styles.options}>
                {
                    list.map((item, i) => (
                        <TouchableOpacity key={i} onPress={item.onPress}>
                            <ListItem topDivider>
                                <Icon
                                    type='feather'
                                    name={item.icon}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>{item.title}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron/>
                            </ListItem>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </>
    )
}

export default Index;

