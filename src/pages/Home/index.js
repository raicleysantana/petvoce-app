import React, {useState} from 'react';
import {ScrollView, View, Image, Text} from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.png';
import {SearchBar} from 'react-native-elements';
import HighlightsList from '../../components/highlightsList';
import ServicesCard from '../../components/servicesCard';
import BannerHome from "../../components/bannerHome";

function index({navigation}) {

    const [search, setSearch] = useState("");

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>

                <View style={[styles.headerItems, {width: '15%'}]}>
                    <Image style={styles.logo} source={Logo}/>
                </View>
                <View style={[styles.headerItems, {width: '70%'}]}>
                    <SearchBar
                        placeholder="Procure por clínica ou Pet Shop"
                        onChangeText={setSearch}
                        value={search}
                        lightTheme={"default"}
                        round={"default"}
                        containerStyle={{backgroundColor: "#FFFFFF", borderBottomWidth: 0, borderTopWidth: 0,}}
                        inputStyle={{color: "#444", height: 38, fontSize: 15}}
                        inputContainerStyle={{height: 40, backgroundColor: "#ccc"}}

                    />
                </View>
                <View style={{width: '15%'}}>

                </View>
            </View>

            <BannerHome/>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>DESTAQUES</Text>

                <Text style={styles.link}>Ver tudo</Text>
            </View>

            <HighlightsList navigation={navigation}/>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>SERVIÇOS</Text>
            </View>

            <ServicesCard navigation={navigation}/>

        </ScrollView>
    );
}

export default index;