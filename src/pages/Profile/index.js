import React from 'react';
import {Card, ListItem, Button, Icon, Avatar, Text} from 'react-native-elements'
import {View} from 'react-native';
import styles from './styles';

function Index() {
    return (
        <>
            <Card>
                <View style={styles.cardHeader}>
                    <View>
                        <Avatar
                            rounded
                            size="large"
                            title="RS"
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                            }}
                        />
                    </View>
                    <View style={styles.cardName}>
                        <Text style={styles.cardTitle}>RAICLEY SANTANA DA SILVA</Text>
                    </View>
                </View>
            </Card>
        </>
    )
}

export default Index;