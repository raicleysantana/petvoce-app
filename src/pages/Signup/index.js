import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    SafeAreaView
} from 'react-native';
import styles from './styles';
import {Button} from 'react-native-elements';
import api from "../../services/api";
import {Dialog, Paragraph} from 'react-native-paper';
import {useToast} from "react-native-styled-toast";

export default function Login({navigation}) {
    const [cliente, setCliente] = useState({
        cli_nome: "",
        cli_email: "",
        cli_endereco: "",
        cli_usuario: "",
        cli_senha: "",
        cli_celular: "",
    });

    const [visibleMsg, setVisibleMsg] = useState(false);
    const [textMsg, setTextMsg] = useState("");

    const hideDialog = () => setVisibleMsg(false);
    const {toast} = useToast();

    const handleEnter = async () => {

        const response = await api.post("register-client", cliente);
        const {data} = response;

        if (data) {
            toast({
                iconName: 'success',
                message: 'Preencha usuário e senha para continuar!',
                accentColor: 'success',
                iconColor: 'success',
                shouldVibrate: true,
            })

            navigation.navigate("Login");
        } else {
            setTextMsg("Usuário não encontrado");
            setVisibleMsg(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, paddingVertical: 10}}>
                <View style={styles.form}>
                    <View style={styles.rowTitle}>
                        <Text style={styles.title}>Cadastre-se</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>NOME</Text>
                        <TextInput
                            placeholder={"Digite seu nome"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={cliente.cli_nome}
                            onChangeText={value => {
                                setCliente({
                                    ...cliente,
                                    ["cli_nome"]: value,
                                })
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-MAIL</Text>
                        <TextInput
                            placeholder={"Digite seu E-Mail"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            keyboardType={"email-address"}
                            value={cliente.cli_email}
                            autoCapitalize="none"
                            onChangeText={value => {
                                setCliente({
                                    ...cliente,
                                    ["cli_email"]: value,
                                })
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>USUÁRIO</Text>
                        <TextInput
                            placeholder={"Digite seu usuário"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={cliente.cli_usuario}
                            autoCapitalize="none"
                            onChangeText={value => {
                                setCliente({
                                    ...cliente,
                                    ["cli_usuario"]: value,
                                })
                            }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>SENHA</Text>
                        <TextInput
                            placeholder={"Digite sua senha"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={cliente.cli_senha}
                            onChangeText={value => {
                                setCliente({
                                    ...cliente,
                                    ["cli_senha"]: value,
                                })
                            }}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CELULAR</Text>
                        <TextInput
                            placeholder={"Digite o número de celular"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={cliente.cli_celular}
                            onChangeText={value => {
                                setCliente({
                                    ...cliente,
                                    ["cli_celular"]: value,
                                })
                            }}
                            keyboardType={"phone-pad"}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>ENDEREÇO</Text>
                        <TextInput
                            placeholder={"Digite seu endereço"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            value={cliente.cli_endereco}
                            onChangeText={value => {
                                setCliente({
                                    ...cliente,
                                    ["cli_endereco"]: value,
                                })
                            }}
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
            </ScrollView>
        </SafeAreaView>
    );
}