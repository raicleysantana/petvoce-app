import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator, ScrollView} from 'react-native';
import {Image, Rating, Tab, TabView, Text, Button} from 'react-native-elements';
import {Title} from 'react-native-paper';
import api from "../../services/api";
import icon_empresa from '../../assets/icon_empresa.png';

function view({route, navigation}) {
    const [productService, setProductService] = useState({cadastro: {cad_nome: ""}});
    const [tabIndex, setTabIndex] = useState(0);

    const {id} = route.params;

    useEffect(() => {
        loadProductService(id);
    }, []);

    async function loadProductService(codigo) {
        const response = await api.get("produto-servico", {
            params: {id}
        });

        setProductService(response.data);

    }

    return (
        <>
            <ScrollView style={styles.container}>

                <Image
                    style={styles.image}
                    source={{uri: "https://billynick.com.br/wp-content/uploads/2021/06/pet-salon-1.png"}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <View style={styles.container2}>
                    <View>
                        <Title style={styles.title}>{productService.ps_nome}</Title>
                    </View>

                    <View style={{flexDirection: "row"}}>
                        <Text style={{color: "#444"}}>Por </Text>
                        <Text style={{fontWeight: "700"}}>{productService.cadastro.cad_nome}</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Rating
                            readonly
                            imageSize={20}
                            style={styles.star}
                            count={5}
                            startingValue={5}
                        />
                        <Text style={styles.textPrice}>R${productService.ps_valor}</Text>
                    </View>
                </View>

                <View style={styles.container2}>

                    <Tab value={tabIndex} onChange={setTabIndex}>
                        <Tab.Item title="Descrição" titleStyle={styles.tabTitle}/>
                        <Tab.Item title="Avaliações" titleStyle={styles.tabTitle}/>
                        <Tab.Item title="Empresa" titleStyle={styles.tabTitle}/>
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

                        <TabView.Item style={styles.tabItem}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Image
                                        source={icon_empresa}
                                        resizeMode={"cover"}
                                        style={{borderRadius: 100, width: 50, height: 50}}
                                    />
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        marginLeft: 15,
                                    }}>{productService.cadastro.cad_nome}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Text style={styles.textBold}>Contato: </Text>
                                    <Text>{productService.cadastro.cad_telefone}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Text style={styles.textBold}>Email: </Text>
                                    <Text>{productService.cadastro.cad_email}</Text>
                                </View>

                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Text style={styles.textBold}>Endereço: </Text>
                                    <Text>{productService.cadastro.cad_endereco}</Text>
                                </View>

                            </View>
                        </TabView.Item>
                    </TabView>

                </View>

            </ScrollView>
            <View style={styles.buttonFooter}>
                <Button
                    title="Agendar Serviço"
                    type="outline"
                    titleStyle={{color: "tomato"}}
                    buttonStyle={{borderColor: "tomato"}}
                />
            </View>
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
        height: 200,
    },

    container2: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        margin: 10,
        borderRadius: 8,
        padding: 15
    },

    textGray: {
        color: "#444",
    },

    textBold: {
        fontWeight: "bold",
    },

    title: {
        fontWeight: "700",
        fontSize: 24,
        marginBottom: 5
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