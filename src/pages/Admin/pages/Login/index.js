import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {Dialog, Paragraph, TextInput} from 'react-native-paper';
import {useToast} from "react-native-styled-toast";
import {Button} from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles';
import logo from '../../../../assets/logo.png';
import api from "../../../../services/api";


export default function Login({navigation}) {
    const [usuario, setUsuario] = useState("webmaster");
    const [senha, setSenha] = useState("webmaster");
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

        const response = await api.post("login-usuario", {usuario, senha});
        const {data} = response;

        if (data) {
            //console.log(data);
            await AsyncStorage.setItem("usuario", JSON.stringify(data));
            navigation.navigate("Drawer");
        } else {
            Alert.alert("Aviso", "Usuário não encontrado");
            //setVisibleMsg(true);
        }
    }

    const Signup = () => {
        navigation.navigate("Signup");
    }

    return (
        <View style={styles.container}>

            <View style={styles.form}>

                {/*<View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}/>
                </View>*/}

                <View style={{marginBottom: 20}}>
                    <Text style={{textAlign: "center", fontSize: 22, fontWeight: 'bold'}}>ACESSO AO SISTEMA</Text>
                </View>


                <View style={styles.inputContainer}>
                    <TextInput
                        label="Usuário"
                        value={usuario}
                        onChangeText={text => setUsuario(text)}
                        mode={"outlined"}
                        activeOutlineColor={"tomato"}
                    />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput
                        label="Senha"
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        mode={"outlined"}
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

            </View>

            <Dialog visible={visibleMsg} onDismiss={hideDialog}>
                <View style={{zIndex: 9999}}>
                    <Dialog.Title>Aviso</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{textMsg}</Paragraph>
                    </Dialog.Content>
                </View>
            </Dialog>

        </View>
    );
}