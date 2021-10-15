import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator, ScrollView} from 'react-native';
import {Image} from 'react-native-elements';
import {Text, Title} from 'react-native-paper';
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
        <ScrollView style={styles.container}>
            <View style={styles.container2}>

                <Image
                    style={styles.image}
                    source={{uri: "https://billynick.com.br/wp-content/uploads/2021/06/pet-salon-1.png"}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <Title>{productService.ps_nome}</Title>
                <View>
                    <Text>{productService.ps_descricao}</Text>
                </View>

            </View>

        </ScrollView>
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
    }
});