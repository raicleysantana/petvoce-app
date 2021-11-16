import React, {useEffect, useState} from 'react';
import {Text, FlatList, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../services/api';
import {Rating} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

function highlightsList({navigation}) {
    const [productsServices, setPoductsServices] = useState([]);

    useEffect(() => {
        loadProductsServices();
    }, []);

    const loadProductsServices = async () => {
        await api.get("produtos-servicos", {}).then(function (response) {
            const retorno = response.data;
            setPoductsServices(retorno);
        });
    }

    const viewProdutoService = (codigo) => {
        navigation.navigate("viewProductService", {
            id: codigo
        });
    }

    const formatName = (name) => {
        if (name.length >= 40)
            return name.substring(0, 40) + '...';
        return name;
    }

    const items = ({item}) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => viewProdutoService(item.ps_id)}>
                <View style={styles.center}>
                    <Image
                        source={{uri: item.ps_foto}}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.title}>{formatName(item.ps_nome)}</Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <View>
                            <Text style={{color: "green"}}>R$ {item.ps_valor}</Text>
                        </View>
                    </View>
                    <View>
                        <Rating
                            readonly
                            imageSize={20}
                            style={styles.star}
                            count={5}
                            startingValue={5}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <FlatList
            data={productsServices}
            keyExtractor={item => item.ps_id.toString()}
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
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginBottom: 2,
        backgroundColor: "#FFFFFF",
        height: 180,
        width: 200,
        justifyContent: 'center',
    },

    image: {
        resizeMode: "contain",
        width: 150,
        height: 100,
    },

    center: {
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color: "#444"
    },

    star: {
        margin: 0,
        width: 90,
        paddingVertical: 5,
    },
});