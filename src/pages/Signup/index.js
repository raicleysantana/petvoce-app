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
                            onChangeText={setUsuario}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-MAIL</Text>
                        <TextInput
                            placeholder={"Digite seu E-Mail"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            onChangeText={setSenha}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>USUÁRIO</Text>
                        <TextInput
                            placeholder={"Digite seu usuário"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            onChangeText={setSenha}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>SENHA</Text>
                        <TextInput
                            placeholder={"Digite sua senha"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            onChangeText={setSenha}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CELULAR</Text>
                        <TextInput
                            placeholder={"Digite o número de celular"}
                            style={styles.input}
                            placeholderTextColor="#999"
                            onChangeText={setSenha}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>ENDEREÇO</Text>
                        <TextInput
                            placeholder={"Digite seu endereço"}
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
            </ScrollView>
        </SafeAreaView>
    );
}