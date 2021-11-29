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


function Cart({navigation}) {
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
            loadCart();
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
                                title: l.title
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
                                                R$ {
                                                (() => {
                                                    var valor = item.produtos_servico.ps_valor * item.vp_quantidade;
                                                    return valor;
                                                })()
                                            }
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

            <View>
                <Button
                    title="Finalizar compra"
                    type="outline"
                    titleStyle={{color: "#FFFFFF"}}
                    buttonStyle={{
                        backgroundColor: "tomato",
                        borderColor: "tomato",
                        paddingVertical: 10,
                        marginHorizontal: 20
                    }}
                    onPress={toggleDialogBottomSheet}
                />
            </View>
            <DialogBox/>
            <DialogBottomSheet/>
        </SafeAreaView>
    );


}

export default Cart;