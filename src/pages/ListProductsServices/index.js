import React, {useEffect, useState} from 'react';
import {ScrollView, FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from "react-native";
import api from "../../services/api";
import {Card, Image, ListItem} from "react-native-elements";

function Index({navigation, route}) {
    const [productsService, setProductService] = useState([]);

    useEffect(() => {
        loadProductService();
    }, []);

    async function loadProductService() {
        const response = await api.get("produtos-servicos-list");

        if (response.data) {
            setProductService(response.data);
        }
    }

    const viewProdutoService = (codigo) => {
        navigation.navigate("viewProductService", {
            id: codigo
        });
    }

    const CardProductItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => viewProdutoService(item.ps_id)}>
                <ListItem containerStyle={styles.card}>
                    <ListItem.Content>
                        <View style={{flexDirection: "row"}}>
                            <View>
                                <Image
                                    style={styles.image}
                                    source={{uri: item.ps_foto}}
                                    resizeMode="contain"
                                    PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={[styles.flex1, {paddingLeft: 10}]}>
                                <Card.Title style={styles.titleCard}>{item.ps_nome}</Card.Title>
                                <View>
                                    <View>
                                    </View>
                                    <View>
                                        <Text>R$ {item.ps_valor}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ListItem.Content>
                    <ListItem.Chevron color="black"/>
                </ListItem>
            </TouchableOpacity>

        );
    }

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={productsService}
                renderItem={CardProductItem}
                keyExtractor={item => item.ps_id.toString()}
            />
        </ScrollView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        height: 100,
        width: 100,
    },

    flex1: {
        flex: 1
    },

    card: {
        flex: 1,
    },

    titleCard: {
        flex: 1,
        textAlign: "left",
        flexWrap: "wrap",
        flexShrink: 1
    }
})