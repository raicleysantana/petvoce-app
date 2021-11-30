import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from "react-native";
import {Button, Card, ListItem} from "react-native-elements";
import api from "../../../../services/api";
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useFocusEffect} from "@react-navigation/native";
import {useToast} from "react-native-styled-toast";

export default function Usuario(props) {
    const [user, setUser] = useState([]);
    const [updated, setUpdated] = useState(false);
    const {toast} = useToast();

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const response = await api.get("usuarios");

                if (response.data) {

                    setUser(response.data);
                }
            })();
        }, [useIsFocused, props, updated])
    );

    /*useEffect(() => {

        (async () => {
            const response = await api.get("usuarios");

            if (response.data) {

                setUser(response.data);
            }
        })();
    }, [useIsFocused, props, updated]);*/

    const deleteUser = async (id) => {
        const response = await api.post("usuario-excluir", {id})

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
                {text: "OK", onPress: () => deleteUser(id)}
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
                        USUÁRIOS
                    </Card.Title>
                    <Button
                        title="Cadastrar"
                        onPress={() => props.navigation.navigate("create-user")}
                    />
                </View>

                <Card.Divider/>

                {
                    user.map((item, i) => (
                        <TouchableOpacity key={i}>
                            <ListItem bottomDivider>

                                <ListItem.Content style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>

                                    <View>
                                        <ListItem.Title>{item.usu_usuario}</ListItem.Title>
                                        <ListItem.Subtitle>{item.usu_nivel_acesso}</ListItem.Subtitle>
                                    </View>
                                    <View style={{
                                        width: "30%",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <Button
                                            onPress={() => props.navigation.navigate("view-user", {
                                                id: item.usu_id,
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
                                            onPress={() => props.navigation.navigate("create-user", {
                                                id: item.usu_id,
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
                                            onPress={() => DialogDelete(item.usu_id)}
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