import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput } from 'react-native';
import styles from './styles';
import { Input, Button } from 'react-native-elements';
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {

    const handleEnter = () => {
        navigation.navigate("TabsBottom");
    }

    return (
        <View style={styles.container}>
            <StatusBar
                style="light"
                translucent={false}
                animated={true}
                backgroundColor={"#3686e7"}
                networkActivityIndicatorVisible={true}
                showHideTransition="fade"

            />
            <View style={styles.form}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Usuário"}
                        style={styles.input}
                        placeholderTextColor="#CCC"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Usuário"}
                        style={styles.input}
                        placeholderTextColor="#CCC"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Entrar"
                        buttonStyle={styles.buttonEnter}
                        onPress={handleEnter}
                    />
                </View>
            </View>
        </View>
    );
}