import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View,} from "react-native";
import {Button, Card, ListItem} from "react-native-elements";
import api from "../../../../services/api";
import {useIsFocused} from "@react-navigation/native";

export default function ViewProduto({navigation, route}) {
    const [produto, setProduto] = useState({});
    const isFocused = useIsFocused();
    const {id} = route.params;

    useEffect(() => {
        (async () => {
            const response = await api.get("produto-servico", {
                params: {id}
            });

            if (response.data) {
                setProduto(response.data);
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
                        Visualizar Produto
                    </Card.Title>

                    <Button
                        title={id ? "Editar" : "Cadastrar"}
                        onPress={() => navigation.navigate("create-produto", {id})}
                    />
                </View>


                <Card.Divider/>

                <View style={styles.row}>
                    <Text style={styles.textBold}>Nome: </Text>
                    <Text style={styles.flex1}>{produto.ps_nome}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBold}>Valor: </Text>
                    <Text style={styles.flex1}>{produto.ps_valor}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBold}>Categoria: </Text>
                    <Text style={styles.flex1}>{produto.cat_id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBold}>Descrição</Text>
                    <Text style={styles.flex1}>{produto.ps_descricao}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.textBold}>Tipo: </Text>
                    <Text style={styles.flex1}>{(() => {
                        return produto.ps_situacao === '1' ? 'Ativo' : 'Inativo';
                    })()}</Text>
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 20
    },

    flex1: {
        flex: 1,
    },

    textBold: {
        fontWeight: "bold"
    }
})