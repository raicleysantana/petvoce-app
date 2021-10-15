import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Routes from './src/routes/AppStack';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" statusBarTranslucent={false}/>
            <Routes/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
