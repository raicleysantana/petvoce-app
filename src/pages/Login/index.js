import React, {useState, useContext} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {Dialog, Paragraph} from 'react-native-paper';
import {useToast} from "react-native-styled-toast";
import {Button} from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './styles';
import logo from '../../assets/logo.png';
import api from "../../services/api";


export default function Login({navigation}) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [textMsg, setTextMsg] = useState("");

    const hideDialog = () => setVisibleMsg(false);
    const {toast} = useToast();

    const handleEnter = async () => {

        if (usuario.length === 0 || senha.length === 0) {

            toast({
                iconName: 'info',
                message: 'Preencha usuário e senha para continuar!',
                accentColor: 'error',
                iconColor: 'error',
                shouldVibrate: true,
            })

            return false;
        }

        const response = await api.post("login", {usuario, senha});
        const {data} = response;

        if (data) {
            //console.log(data);
            await AsyncStorage.setItem("id", data.cli_id.toString());
            navigation.navigate("TabsBottom");
        } else {
            setTextMsg("Usuário não encontrado");
            setVisibleMsg(true);
        }
    }

    const Signup = () => {
        navigation.navigate("Signup");
    }

    return (
        <View style={styles.container}>

            <View style={styles.form}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Usuário"}
                        style={styles.input}
                        placeholderTextColor="#999"
                        onChangeText={setUsuario}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Usuário"}
                        style={styles.input}
                        placeholderTextColor="#999"
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Entrar"
                        buttonStyle={styles.buttonEnter}
                        onPress={() => handleEnter()}
                    />
                </View>

                <View style={{marginTop: 20, flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{color: '#646161'}}>Não tem um conta? </Text>
                    <TouchableOpacity onPress={Signup}>
                        <Text style={{color: "#2a5db0"}}>Crie uma</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Dialog visible={visibleMsg} onDismiss={hideDialog}>
                <Dialog.Title>Aviso</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{textMsg}</Paragraph>
                </Dialog.Content>
            </Dialog>

        </View>
    );
}