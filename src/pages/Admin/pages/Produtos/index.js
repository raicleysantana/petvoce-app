import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from "react-native";
import {Button, Card, ListItem} from "react-native-elements";
import api from "../../../../services/api";
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useFocusEffect} from "@react-navigation/native";
import {useToast} from "react-native-styled-toast";

export default function Produtos(props) {
    const [produtos, setProdutos] = useState([]);
    const [updated, setUpdated] = useState(false);
    const {toast} = useToast();

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const response = await api.get("produtos-servicos");

                if (response.data) {

                    setProdutos(response.data);
                }
            })();
        }, [useIsFocused, props, updated])
    );

    const deleteProduto = async (id) => {
        const response = await api.post("produto-excluir", {id})

        if (response.data) {
            setUpdated(!updated);
            toast({
                iconName: 'check-circle',
                message: 'Registro salvo com sucesso',
                accentColor: 'success',
                iconColor: 'success',
                shouldVibrate: true,
            });
        }
    }

    const DialogDelete = (id) =>
        Alert.alert(
            "Aviso",
            "Deseja excluír este usuario",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {text: "OK", onPress: () => deleteProduto(id)}
            ]
        );

    return (
        <ScrollView>
            <Card>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 10
                }}>
                    <Card.Title>
                        PRODUTOS
                    </Card.Title>
                    <Button
                        title="Cadastrar"
                        onPress={() => props.navigation.navigate("create-produto", {
                            codigo : ""
                        })}
                    />
                </View>

                <Card.Divider/>

                {
                    produtos.map((item, i) => (
                        <TouchableOpacity key={i}>
                            <ListItem bottomDivider>

                                <ListItem.Content style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>

                                    <View style={{flex: 1, paddingHorizontal: 5}}>
                                        <ListItem.Title>{item.ps_nome}</ListItem.Title>
                                    </View>
                                    <View style={{
                                        width: "30%",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <Button
                                            onPress={() => props.navigation.navigate("view-produto", {
                                                id: item.ps_id,
                                            })}
                                            icon={
                                                <Feather
                                                    name="eye"
                                                    size={15}
                                                    color="white"
                                                />
                                            }
                                        />
                                        <Button
                                            onPress={() => props.navigation.navigate("create-produto", {
                                                id: item.ps_id,
                                            })}
                                            icon={
                                                <Feather
                                                    name="edit"
                                                    size={15}
                                                    color="white"
                                                />
                                            }
                                        />
                                        <Button
                                            onPress={() => DialogDelete(item.ps_id)}
                                            icon={
                                                <Feather
                                                    name="trash-2"
                                                    size={15}
                                                    color="white"
                                                />
                                            }
                                        />
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableOpacity>
                    ))
                }
            </Card>
        </ScrollView>
    );
}