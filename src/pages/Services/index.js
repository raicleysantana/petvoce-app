import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem, Rating } from "react-native-elements";
import api from "../../services/api";
import icon_default from '../../assets/icon_empresa.png';

function Services({ navigation, route }) {
    const [services, setService] = useState([]);

    const { type, title } = route.params;

    useEffect(() => {
        navigation.setOptions({ title });

        loadServices();
    }, []);

    async function loadServices() {
        const response = await api.get("tipo-servicos", {
            params: { type }
        });

        await setService(response.data);
    }

    const viewStore = (codigo) => {
        navigation.navigate("view_store", {
            id: codigo
        });
    }

    return (
        <View style={styles.container}>
            <View>
                {
                    services.map((item, index) => (

                        <ListItem key={index} bottomDivider onPress={() => viewStore(item.cad_id)}>
                            <Avatar source={icon_default} />
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: "bold" }}>{item.cad_nome}</ListItem.Title>
                                <ListItem.Subtitle>{item.cad_endereco}</ListItem.Subtitle>
                                <Rating
                                    readonly
                                    imageSize={15}
                                    style={styles.star}
                                    count={5}
                                    startingValue={5}
                                />
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </View>
    );
}

export default Services;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },

    star: {}
})