import React, {useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {BottomSheet, Button, Dialog, Image, ListItem} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from "@react-navigation/native";
import api from "../../services/api";
import styles from "./styles";

import {useToast} from "react-native-styled-toast";


function Sales({navigation}) {
    const [cliId, setCliId] = useState(0);
    const [indice, setIndice] = useState(0);
    const [produtosVendas, setProdutosVendas] = useState("");
    const [time, setTime] = useState(null);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);
    const [checked, setChecked] = useState("");

    const logoPix = require("../../assets/payment/pix.png");
    const {toast} = useToast();

    useFocusEffect(
        React.useCallback(() => {
            loadSales();
        }, [])
    );

    const payment = [
        {
            id: '1',
            title: 'Boleto',
            icon: require("../../assets/payment/boleto.png")
        },
        {
            id: '2',
            title: 'Cartão de Credito',
            icon: require("../../assets/payment/credit_card.png")
        },
        {
            id: '3',
            title: 'Pix',
            icon: require("../../assets/payment/pix.png"),
        },
        {
            id: '4',
            title: "Cancelar",
            containerStyle: {
                flex: 1,
                backgroundColor: '#e35d6a',
            },
            content: {alignItems: "center", justifyContent: "center"},
            titleStyle: {color: "#FFFFFF"},
            icon: require("../../assets/payment/cancel.png"),
        },
    ];

    async function loadSales() {
        const cli_id = await AsyncStorage.getItem("id");

        setCliId(cli_id);

        const {data} = await api.post("vendas-pagas",
            {cli_id},
        );

        console.log(data);
        setProdutosVendas(data);
    }

    const toggleDialog = () => {
        setVisibleDialog(!visibleDialog);
    }

    const toggleDialogBottomSheet = () => {
        setIsVisibleBottomSheet(!isVisibleBottomSheet);
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

    const DialogBottomSheet = () => (
        <BottomSheet
            isVisible={isVisibleBottomSheet}
            containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.4)'}}
            modalProps={{visible: isVisibleBottomSheet}}
        >

            {payment.map((l, i) => (
                <ListItem
                    key={i} topDivider
                    containerStyle={l.containerStyle ? l.containerStyle : styles.containerStyle}
                    onPress={function () {
                        if (l.id == 4) {
                            toggleDialogBottomSheet();
                        } else {
                            navigation.navigate("Checkout", {
                                id: l.id,
                                title: l.title,
                                cli_id: cliId,
                            });
                        }
                    }}>
                    <ListItem.Content style={l.content}>
                        <View style={{
                            flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}>
                            <Image
                                resizeMode={"center"} source={l.icon}
                                style={{width: 20, height: 20}}/>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </View>
                    </ListItem.Content>
                </ListItem>
            ))}
        </BottomSheet>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={produtosVendas}
                keyExtractor={item => item.ven_id.toString()}
                renderItem={({item, index}) => {

                    return (
                        <ListItem topDivider key={index.toString()}>
                            <ListItem.Content>
                                <View style={{flexDirection: "column"}}>
                                    <View>
                                        <Text>Data:</Text>
                                        <Text style={styles.bold}>{item.ven_data_criacao}</Text>
                                    </View>

                                    <View>
                                        <Text>Situação:</Text>
                                        <Text style={styles.bold}>{item.ven_situacao}</Text>
                                    </View>
                                    <View>
                                        <Text>Forma de Pagamento:</Text>
                                        <Text style={styles.bold}>{item.forma_pagamento.fp_descricao}</Text>
                                    </View>
                                    <View>
                                        <Text>Valor Total:</Text>
                                        <Text style={{color: "green", fontWeight: "bold"}}>
                                            R$ {item.ven_total}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            padding: 5,
                                            justifyContent: "space-between"
                                        }}>
                                    </View>
                                    <View style={{marginBottom: 20, marginTop: 10}}>

                                    </View>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    )
                }}
            />

            <DialogBox/>
            <DialogBottomSheet/>
        </SafeAreaView>
    );


}

export default Sales;