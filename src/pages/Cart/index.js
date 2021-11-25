import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Image, ListItem} from "react-native-elements";
import api from "../../services/api";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from "@react-navigation/native";

function Cart({navigation, route}) {
    const [cli_id, setCli_id] = useState(0);
    const [produtosVendas, setProdutosVendas] = useState("");
    const [qtd, setQtd] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            loadCart();
        }, [])
    );

    async function loadCart() {
        const cli_id = await AsyncStorage.getItem("id");

        const {data} = await api.get("vendas-produtos", {
            params: {cli_id},
        });


        setProdutosVendas(data);
    }

    const getItemIndex = (arr, item) => {
        return arr.findIndex((e) => e.id === item);
    };


    const incrementQtdItem = (index) => {
        console.log(produtosVendas[index]);
    }

    const decrementQtdItem = (index) => {
        console.log(produtosVendas[index]);
    }

    const removeItem = (index) => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={produtosVendas}
                keyExtractor={item => item.vp_id.toString()}
                renderItem={({item, index}) => {
                    return (
                        <ListItem topDivider key={index.toString()}>
                            <ListItem.Content>
                                <View style={{flexDirection: "row"}}>
                                    <View>
                                        <Image
                                            style={styles.image}
                                            source={{uri: item.produtos_servico.ps_foto}}
                                            resizeMode="contain"
                                            PlaceholderContent={<ActivityIndicator/>}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            padding: 5,
                                            justifyContent: "space-between"
                                        }}>
                                        <ListItem.Title>{item.produtos_servico.ps_nome}</ListItem.Title>
                                        <View style={{marginBottom: 20, marginTop: 10}}>
                                            <Text style={{color: "green"}}>
                                                R$ {item.produtos_servico.ps_valor}
                                            </Text>
                                        </View>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <View style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                width: "25%"
                                            }}>
                                                <TouchableOpacity onPress={() => incrementQtdItem(index)}>
                                                    <Feather name={"minus-circle"} color={"#000"} size={21}/>
                                                </TouchableOpacity>
                                                <Text>{item.vp_quantidade}</Text>
                                                <TouchableOpacity onPress={() => decrementQtdItem(index)}>
                                                    <Feather name={"plus-circle"} color={"#000"} size={21}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={removeItem}>
                                                    <Feather name={"trash-2"} color={"#999"} size={21}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    )
                }}
            />

        </SafeAreaView>
    );
}

export default Cart;