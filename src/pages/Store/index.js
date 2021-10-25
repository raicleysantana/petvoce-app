import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, View, Text } from 'react-native';
import imgDefault from '../../assets/img_default.png';
import api from '../../services/api';
import { Title, Avatar, Button, Card, Paragraph } from 'react-native-paper';

function Store({ navigation, route }) {

    const [store, setStore] = useState([]);
    const { id } = route.params;

    useEffect(() => {
        loadStore();
    }, []);

    async function loadStore() {
        const response = await api.get("store", {
            params: { id }
        });

        setStore(response.data);
    }

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <ScrollView style={styles.container}>


            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Title>{store.cad_nome}</Title>
                    <Paragraph>{store.cad_endereco}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

export default Store;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        resizeMode: "contain",
        width: '100%',
        height: 150,
    },
});