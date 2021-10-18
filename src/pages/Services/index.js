import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Avatar, ListItem, Rating} from "react-native-elements";
import api from "../../services/api";
import icon_default from '../../assets/icon_empresa.png';

function Services({navigation, route}) {
    const [services, setService] = useState([]);

    const {type, title} = route.params;
    const list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ];

    useEffect(() => {
        navigation.setOptions({title});

        loadServices();
    }, []);

    async function loadServices() {
        const response = await api.get("destaques", {
            params: {type}
        });

        await setService(response.data);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{padding: 5}}>
                    {
                        services.map((item, index) => (

                            <ListItem key={index} bottomDivider>
                                <Avatar source={icon_default}/>
                                <ListItem.Content>
                                    <ListItem.Title style={{ fontWeight : "bold"}}>{item.cad_nome}</ListItem.Title>
                                    <ListItem.Subtitle>{item.cad_endereco}</ListItem.Subtitle>
                                    <Rating
                                        readonly
                                        imageSize={15}
                                        style={styles.star}
                                        count={5}
                                        startingValue={5}
                                    />
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </View>
            </View>
        </>

    );
}

export default Services;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    star: {}
})