import React, {useEffect, useState} from 'react';
import {useFocusEffect} from "@react-navigation/native";
import {Text, StyleSheet, View} from "react-native";
import api from "../../services/api";
import {Button} from "react-native-elements";
import {useToast} from "react-native-styled-toast";


function Checkout({navigation, route}) {
    const [total, setTotal] = useState(0);
    const {toast} = useToast();
    const {id, title, cli_id} = route.params;
    const [fp_id, setFp_id] = useState(0);

    useEffect(() => {
        (async () => {
            const {data} = await api.post("venda-detalhes", {
                cli_id
            });

            if (!data.total) {
                navigation.goBack();
                return false;
            }
            setTotal(data.total);
            setFp_id(id);
        })();
    }, []);

    const pagar = async () => {
        const response = await api.post("venda-pagar", {
            cli_id, total, fp_id
        });

        if (response.data) {
            toast({
                iconFamily: "Feather",
                iconName: 'check-circle',
                message: 'Venda paga com sucesso!',
                accentColor: 'success',
                iconColor: 'success',
                shouldVibrate: true,
            });

            navigation.navigate("vendas");
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{padding: 10, flexDirection: "row", justifyContent: "center"}}>
                    <Text style={styles.title}>Finalizar Compra</Text>
                </View>
                <View style={styles.mb10}>
                    <Text>Forma de Pagamento</Text>
                    <Text style={styles.bold}>{title}</Text>
                </View>

                <View style={styles.mb10}>
                    <Text>Total:</Text>
                    <Text style={styles.bold}>R$ {total}</Text>
                </View>
                <View style={{
                    marginTop: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button
                        title="Pagar"
                        type="outline"
                        titleStyle={{color: "#FFFFFF"}}
                        buttonStyle={{
                            backgroundColor: "tomato",
                            borderColor: "tomato",
                            paddingVertical: 10,
                            width: '100%'
                        }}
                        onPress={pagar}
                    />
                </View>
            </View>
        </>
    );
}

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    bold: {
        fontWeight: "bold",
    },

    mb10: {
        marginBottom: 10
    }
});