import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import styles from './styles';
import {Button} from 'react-native-elements';
import logo from '../../assets/logo.png';
import api from "../../services/api";
import {Dialog, Paragraph} from 'react-native-paper';

export default function Login({navigation}) {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [textMsg, setTextMsg] = useState("");

    const hideDialog = () => setVisibleMsg(false);

    const handleEnter = async () => {
        if (usuario.length === 0 || senha.length === 0) {
            setTextMsg('Preencha usuário e senha para continuar!');
            setVisibleMsg(true);
            console.log('123');
            return false;
        }

        const response = await api.post("login", {usuario, senha});
        const {data} = response;

        if (data) {
            navigation.navigate("TabsBottom");

            console.log(data);
        } else {
            setTextMsg("Usuário não encontrado");
            setVisibleMsg(true);
        }
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
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Usuário"}
                        style={styles.input}
                        placeholderTextColor="#999"
                        onChangeText={setSenha}
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
                <Dialog.Title>Aviso</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{textMsg}</Paragraph>
                </Dialog.Content>
            </Dialog>

        </View>
    );
}