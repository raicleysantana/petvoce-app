import React, {useEffect, useState} from 'react';
import {Picker, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, Card, ListItem} from "react-native-elements";
import api from "../../../../services/api";
import {RadioButton, TextInput} from "react-native-paper";
import {useToast} from "react-native-styled-toast";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

export default function CreateProduto({navigation, route}) {

    var id = "";
    if (route.params) {
        id = route.params.id;
        console.log(route.params.id);
    } else {
        id = "";
    }

    const [categorias, setCategorias] = useState([]);
    const [produto, setProduto] = useState({
        ps_id: "",
        ps_nome: "",
        ps_tipo: "",
        ps_descricao: "",
        ps_valor: "",
        cat_id: "",
        ps_foto: "",
    });
    const {toast} = useToast();

    const isFocused = useIsFocused();

    useFocusEffect(
        React.useCallback(() => {

            (async () => {
                const responseCategorias = await api.get("categorias");
                setCategorias(responseCategorias.data);
            })();

            if (id) {
                (async () => {

                    const response = await api.get("produto-servico", {
                        params: {id}
                    });

                    if (response.data) {
                        setProduto(response.data);
                    }
                })();
            } else {
                console.log("ude");
                setProduto(prev => ({
                    ...prev,
                    ps_id: "",
                    ps_nome: "",
                    ps_tipo: "",
                    ps_descricao: "",
                    ps_valor: "",
                    cat_id: "",
                    ps_foto: "",
                }));
            }
        }, [id])
    )


    const save = async () => {
        const reponse = await api.post("produto-salvar", produto);

        if (reponse.data) {
            toast({
                iconName: 'check-circle',
                message: 'Registro salvo com sucesso',
                accentColor: 'success',
                iconColor: 'success',
                shouldVibrate: true,
            })
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Card>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 10
                }}>
                    <Card.Title>
                        {id ? "Editar" : "Cadastrar"} Produto
                    </Card.Title>

                </View>

                <Card.Divider/>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Nome"
                        value={produto.ps_nome}
                        onChangeText={value => {
                            setProduto({
                                ...produto,
                                ["ps_nome"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Valor"
                        value={produto.ps_valor}
                        onChangeText={value => {
                            setProduto({
                                ...produto,
                                ["ps_valor"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Descricao"
                        value={produto.ps_descricao}
                        onChangeText={value => {
                            setProduto({
                                ...produto,
                                ["ps_descricao"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text>Categorias</Text>

                    <Picker
                        selectedValue={produto.cat_id}
                        onValueChange={(itemValue, itemIndex) => {
                            setProduto({
                                ...produto,
                                ["cat_id"]: itemValue,
                            })
                        }}>
                        {categorias.map((item, index) => (
                            <Picker.Item key={index} label={item.cat_nome} value={item.cat_id}/>
                        ))}
                    </Picker>

                </View>


                <View style={styles.inputContainer}>
                    <Text>Tipo de Serviço</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <RadioButton
                            value="produto"
                            status={produto.ps_tipo === 'produto' ? 'checked' : 'unchecked'}
                            onPress={() =>
                                setProduto({
                                    ...produto,
                                    ["ps_tipo"]: 'produto',
                                })
                            }
                        />
                        <Text>Produto</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <RadioButton
                            value="servico"
                            status={produto.ps_tipo === 'servico' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setProduto({
                                    ...produto,
                                    ["ps_tipo"]: 'servico',
                                })
                            }}
                        />
                        <Text>Serviço</Text>
                    </View>

                </View>

                <View style={styles.inputContainer}>
                    <Button
                        title="Salvar"
                        onPress={save}
                    />
                </View>
            </Card>
        </ScrollView>
    )
        ;
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        inputContainer: {
            marginBottom: 10,
        }
    }
)
