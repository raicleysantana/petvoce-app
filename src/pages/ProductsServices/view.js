import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Image} from 'react-native';
import api from "../../services/api";

function view({route, navigation}) {
    const [productService, setProductService] = useState([]);

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
        <SafeAreaView style={styles.container}>

            <Image
                style={styles.image}
                source={{uri: "https://billynick.com.br/wp-content/uploads/2021/06/pet-salon-1.png"}}
            />

            <View>
                <Text>{productService.ps_nome}</Text>
            </View>
            <View>
                <Text>{productService.ps_descricao}</Text>
            </View>
        </SafeAreaView>
    );
}

export default view;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    image: {
        width: '100%',
        height: 200,
    }
});