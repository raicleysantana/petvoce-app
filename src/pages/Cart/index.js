import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Dialog, Image, ListItem} from "react-native-elements";
import api from "../../services/api";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from "@react-navigation/native";
import {useToast} from "react-native-styled-toast";

function Cart() {
    const [cliId, setCliId] = useState(0);
    const [vpId, setVpId] = useState(0);
    const [indice, setIndice] = useState(0);
    const [produtosVendas, setProdutosVendas] = useState("");
    const [time, setTime] = useState(null);
    const [visibleDialog, setVisibleDialog] = useState(false);

    const {toast} = useToast();

    useFocusEffect(
        React.useCallback(() => {
            loadCart();
        }, [])
    );

    async function loadCart() {
        const cli_id = await AsyncStorage.getItem("id");

        setCliId(cli_id);

        const {data} = await api.get("vendas-produtos", {
            params: {cli_id},
        });

        setProdutosVendas(data);
    }

    const toggleDialog = () => {
        setVisibleDialog(!visibleDialog);
    }

    const incrementQtdItem = async (index, opc) => {
        var pv = produtosVendas[index];
        var qtd = pv.vp_quantidade;

        if (opc === "mais") {
            qtd += 1;
        } else if (opc === "menos") {
            qtd -= 1;
        }

        setProdutosVendas(Object.values({
            ...produtosVendas,
            [index]: {...produtosVendas[index], vp_quantidade: qtd}
        }));

        clearTimeout(time);

        setTime(setTimeout(async () => {

            const response = await api.get("venda", {
                params: {
                    vp_quantidade: qtd,
                    vp_id: pv.vp_id,
                    cli_id: cliId,
                    ps_id: pv.ps_id
                }
            });

        }, 1000));

    }

    /*const decrementQtdItem = (index) => {
        console.log(produtosVendas[index]);
    }*/

    const removeItem = (index) => {
        setIndice(index);
        toggleDialog();
    }

    const deleteItem = async (index) => {
        var pv = produtosVendas[indice];

        const response = await api.get("venda", {
            params: {
                cli_id: cliId,
                ps_id: pv.ps_id,
                opc: "remove",
            }
        });

        setProdutosVendas(produtosVendas.filter(item => item.vp_id != pv.vp_id));

        if (response.data) {
            toast({
                iconFamily: "Feather",
                iconName: 'check-circle',
                message: 'Produto removido com sucesso!',
                accentColor: 'success',
                iconColor: 'success',
                shouldVibrate: true,
            });
        }
    }

    const DialogBox = () => (
        <Dialog
            isVisible={visibleDialog}
            onBackdropPress={toggleDialog}
        >
            <Dialog.Title title="Confirmar"/>
            <Text>Deseja remover este produto do carrinho?</Text>

            <Dialog.Actions>
                <Dialog.Button
                    title="SIM"
                    onPress={() => {
                        toggleDialog();
                        deleteItem(indice);
                    }}
                />
                <Dialog.Button title="CANCELAR" onPress={toggleDialog}/>
            </Dialog.Actions>
        </Dialog>
    );

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
                                                <TouchableOpacity onPress={() => incrementQtdItem(index, "menos")}>
                                                    <Feather name={"minus-circle"} color={"#000"} size={21}/>
                                                </TouchableOpacity>
                                                <Text>{item.vp_quantidade}</Text>
                                                <TouchableOpacity onPress={() => incrementQtdItem(index, "mais")}>
                                                    <Feather name={"plus-circle"} color={"#000"} size={21}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => removeItem(index)}>
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
            <DialogBox/>
        </SafeAreaView>
    );


}

export default Cart;