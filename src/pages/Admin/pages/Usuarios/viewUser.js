import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View,} from "react-native";
import {Button, Card, ListItem} from "react-native-elements";
import api from "../../../../services/api";
import {useIsFocused} from "@react-navigation/native";

export default function ViewUser({navigation, route}) {
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    const {id} = route.params;

    useEffect(() => {
        (async () => {
            const response = await api.get("usuario-visualizar", {
                params: {id}
            });

            if (response.data) {
                setUser(response.data);
            }
        })();
    }, [isFocused]);

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
                        Visualizar Usuário
                    </Card.Title>

                    <Button
                        title={id ? "Editar" : "Cadastrar"}
                        onPress={() => navigation.navigate("create-user", {id})}
                    />
                </View>


                <Card.Divider/>

                <View style={styles.row}>
                    <Text>Nome: </Text>
                    <Text>{user.usu_nome}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Email: </Text>
                    <Text>{user.usu_email}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Usuário: </Text>
                    <Text>{user.usu_usuario}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Nivel de Acesso: </Text>
                    <Text>{user.usu_nivel_acesso}</Text>
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 20
    }
})