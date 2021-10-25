import React, { useEffect, useState } from 'react';
import { Text, FlatList, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';
import imgDefault from '../assets/img_default.png';

function highlightsList({ navigation }) {
    const [productsServices, setPoductsServices] = useState([]);

    useEffect(() => {
        loadProductsServices();
    }, []);


    const loadProductsServices = async () => {
        await api.get("destaques", {}).then(function (response) {
            const retorno = response.data;
            setPoductsServices(retorno);
        });
    }

    const viewStore = (codigo) => {
        navigation.navigate("view_store", {
            id: codigo
        });
    }

    const items = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => viewStore(item.cad_id)}>
                <Image
                    source={imgDefault}
                    style={styles.image}
                />
                <Text style={styles.title}>{item.cad_nome}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <FlatList
            data={productsServices}
            keyExtractor={item => item.cad_id.toString()}
            renderItem={items}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
}

export default highlightsList;

const styles = StyleSheet.create({

    card: {
        /*borderWidth: .8,
        borderColor: "#ccc",*/
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginBottom: 2,
        backgroundColor: "#FFFFFF",
        height: 160,
        width: 200,
        justifyContent: 'center',
        alignItems: "center"
    },

    image: {
        resizeMode: "contain",
        width: 150,
        height: 100,
    },

    title: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "#444"
    }
});