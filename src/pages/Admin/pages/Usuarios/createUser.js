import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, Card, ListItem} from "react-native-elements";
import api from "../../../../services/api";
import {RadioButton, TextInput} from "react-native-paper";
import {useToast} from "react-native-styled-toast";

export default function CreateUser({navigation, route}) {

    var id = "";
    if (route.params) {
        id = route.params.id;
    }


    const [user, setUser] = useState({
        usu_id: "",
        usu_nome: "",
        usu_email: "",
        usu_usuario: "",
        usu_senha: "",
        usu_nivel_acesso: "",
    });
    const {toast} = useToast();

    useEffect(() => {
        if (id) {
            (async () => {
                const response = await api.get("usuario-visualizar", {
                    params: {id}
                });

                if (response.data) {

                    setUser(response.data);
                }
            })();
        }

    }, [id]);

    const save = async () => {
        const reponse = await api.post("usuario-salvar", user);

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
        <View>
            <Card>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 10
                }}>
                    <Card.Title>
                        {id ? "Editar" : "Cadastrar"} Usuário
                    </Card.Title>

                </View>

                <Card.Divider/>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Nome"
                        value={user.usu_nome}
                        onChangeText={value => {
                            setUser({
                                ...user,
                                ["usu_nome"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="E-Mail"
                        value={user.usu_email}
                        onChangeText={value => {
                            setUser({
                                ...user,
                                ["usu_email"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Usuário"
                        value={user.usu_usuario}
                        onChangeText={value => {
                            setUser({
                                ...user,
                                ["usu_usuario"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Senha"
                        value={user.usu_senha}
                        onChangeText={value => {
                            setUser({
                                ...user,
                                ["usu_senha"]: value,
                            })
                        }}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text>Nivel de Acesso</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <RadioButton
                            value="administrator"
                            status={user.usu_nivel_acesso === 'administrator' ? 'checked' : 'unchecked'}
                            onPress={() =>
                                setUser({
                                    ...user,
                                    ["usu_nivel_acesso"]: 'administrator',
                                })
                            }
                        />
                        <Text>Administrador</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <RadioButton
                            value="manager"
                            status={user.usu_nivel_acesso === 'manager' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUser({
                                    ...user,
                                    ["usu_nivel_acesso"]: 'manager',
                                })
                            }}
                        />
                        <Text>Funcionario</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <RadioButton
                            value="manager"
                            status={user.usu_nivel_acesso === 'user' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUser({
                                    ...user,
                                    ["usu_nivel_acesso"]: 'user',
                                })
                            }}
                        />
                        <Text>Usuário</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Button
                        title="Salvar"
                        onPress={save}
                    />
                </View>
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
})
