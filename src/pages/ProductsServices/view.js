import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Image, Rating, Tab, TabView, Text, Button, Dialog} from 'react-native-elements';
import {Title} from 'react-native-paper';
import api from "../../services/api";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToast} from "react-native-styled-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

function view({route, navigation}) {
    const [cli_id, setCli_id] = useState(0);
    const [productService, setProductService] = useState({categoria: {}});
    const [tabIndex, setTabIndex] = useState(0);
    const [visibleDialog, setVisibleDialog] = useState(false);

    const {id} = route.params;
    const {toast} = useToast();

    useEffect(() => {
        loadProductService(id);

        (async () => {
            const id = await AsyncStorage.getItem("id");
            setCli_id(id);
        })();
    }, []);

    async function loadProductService(codigo) {
        const response = await api.get("produto-servico", {
            params: {id}
        });

        setProductService(response.data);
    }

    const backPage = () => {
        navigation.goBack();
    }

    const toggleDialog = () => {
        setVisibleDialog(!visibleDialog);
    }

    const addCart = async () => {
        const response = await api.get("venda", {
            params: {cli_id, ps_id: id, opc: ""}
        });

        if (response) {
            toast({
                iconFamily: "Feather",
                iconName: 'check-circle',
                message: 'Produto adicionado com sucesso!',
                accentColor: 'success',
                iconColor: 'success',
                shouldVibrate: true,
            });
        }

    }

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={{zIndex: 2, flex: 1, backgroundColor: "#FFFFFF", position: "relative"}}>
                    <TouchableOpacity
                        style={{position: "absolute", top: 15, left: 15, zIndex: 99}}
                        onPress={() => backPage()}
                    >
                        <MaterialCommunityIcons name="arrow-left" color={"#444"} size={32}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonHeart}
                        onPress={() => alert("Adicionado aos favoritos!")}
                    >
                        <MaterialCommunityIcons name="heart-outline" color={"#FFFFFF"} size={32}/>
                    </TouchableOpacity>
                    <Image
                        style={styles.image}
                        source={{uri: productService.ps_foto}}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                </View>

                <View style={styles.container2}>

                    <View>
                        <Title style={styles.title}>{productService.ps_nome}</Title>
                    </View>

                    <View style={{flexDirection: "row"}}>
                        <Text style={{fontWeight: "700"}}>Categoria: </Text>
                        <Text style={{color: "#444"}}>{productService.categoria.cat_nome}</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Rating
                            readonly
                            imageSize={20}
                            style={styles.star}
                            count={5}
                            startingValue={5}
                        />
                        <Text style={styles.textPrice}>R$ {productService.ps_valor}</Text>
                    </View>
                </View>

                <View style={styles.container2}>

                    <Tab value={tabIndex} onChange={setTabIndex}>
                        <Tab.Item title="Descrição" titleStyle={styles.tabTitle}/>
                        <Tab.Item title="Avaliações" titleStyle={styles.tabTitle}/>
                    </Tab>

                    <TabView value={tabIndex} onChange={setTabIndex}>
                        <TabView.Item style={styles.tabItem}>
                            <Text style={styles.textGray}>{productService.ps_descricao}</Text>
                        </TabView.Item>

                        <TabView.Item style={styles.tabItem}>
                            <Rating
                                readonly
                                imageSize={20}
                                style={styles.star}
                                reviews={"Estrelas"}
                            />
                        </TabView.Item>
                    </TabView>

                </View>

            </ScrollView>
            <View style={styles.buttonFooter}>
                {(() => {

                    if (productService.ps_tipo === "produto") {
                        return <Button
                            title={"Adicionar ao carrinho"}
                            type={"outline"}
                            titleStyle={{color: "tomato"}}
                            buttonStyle={{borderColor: "tomato"}}
                            onPress={toggleDialog}
                        />
                    } else {
                        return <Button
                            title="Agendar Serviço"
                            type="outline"
                            titleStyle={{color: "tomato"}}
                            buttonStyle={{borderColor: "tomato"}}
                        />
                    }
                })()}

            </View>

            <Dialog
                isVisible={visibleDialog}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Confirmar"/>
                <Text>Deseja adicionar este produto no carrinho?</Text>

                <Dialog.Actions>
                    <Dialog.Button
                        title="SIM"
                        onPress={() => {
                            toggleDialog();
                            addCart();
                        }}
                    />
                    <Dialog.Button title="CANCELAR" onPress={toggleDialog}/>
                </Dialog.Actions>
            </Dialog>
        </>
    );
}

export default view;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        width: '100%',
        height: 220,
        resizeMode: "contain",
    },

    container2: {
        backgroundColor: "#FFFFFF",
        margin: 10,
        borderRadius: 8,
        padding: 15,
        zIndex: 1,
    },

    buttonHeart: {
        position: "absolute",
        backgroundColor: "tomato",
        padding: 10,
        borderWidth: 1,
        borderColor: "tomato",
        borderRadius: 50,
        bottom: -30,
        right: 20,
        zIndex: 9999
    },

    textGray: {
        color: "#717171",
    },

    textBold: {
        fontWeight: "bold",
    },

    title: {
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 5,
    },

    star: {
        margin: 0,
        width: 100,
        paddingVertical: 5,
    },

    tabTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "tomato",
    },

    tabItem: {
        width: '90%',
        paddingTop: 10
    },

    textPrice: {
        fontSize: 18,
        fontWeight: "700",
    },

    buttonFooter: {
        width: '100%',
        position: "absolute",
        bottom: 0,
        height: 'auto',
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderTopColor: "#999",
        borderTopWidth: .3,
    }
});