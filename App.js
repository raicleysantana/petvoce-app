import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Routes from './src/routes/AppStack';
import {ThemeProvider} from 'styled-components';
import {ToastProvider} from 'react-native-styled-toast';
import theme from './src/theme/theme';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ThemeProvider theme={theme}>
                <ToastProvider>
                    <StatusBar
                        style="dark"
                        translucent={false}
                        animated={true}
                        backgroundColor={"#FFFFFF"}
                        networkActivityIndicatorVisible={true}
                        showHideTransition="fade"

                    />
                    <Routes/>

                </ToastProvider>
            </ThemeProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
