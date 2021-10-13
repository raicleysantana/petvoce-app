import React, {useEffect, useState} from 'react';
import {Text, FlatList, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from "../assets/logo.png";
import ImgPetSaude from '../assets/services/pet-pet-saude.jpg';
import ImgPetShop from '../assets/services/pet-pet-shop.jpg';
import ImgSeuPet from '../assets/services/pet-seu-pet.jpg';
import ImgVeterinario from '../assets/services/pet-veterinario.jpg';
import ImgGroomer from '../assets/services/pet-groomer.jpg';
import ImgBlog from '../assets/services/pet-blog.jpg';

function servicesCard() {
    return (
        <>
            <View style={styles.servicesContainer}>
                <TouchableOpacity style={styles.servicesItem}>
                    <Image source={ImgPetSaude} style={styles.serviceImage}/>
                    <Text style={styles.serviceTitle}>PET SAÚDE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servicesItem}>
                    <Image source={ImgPetShop} style={styles.serviceImage}/>
                    <Text style={styles.serviceTitle}>PET SHOP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servicesItem}>
                    <Image source={ImgSeuPet} style={styles.serviceImage}/>
                    <Text style={styles.serviceTitle}>SEU PET</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.servicesContainer}>
                <TouchableOpacity style={styles.servicesItem}>
                    <Image source={ImgVeterinario} style={styles.serviceImage}/>
                    <Text style={styles.serviceTitle}>VETÉRINARIO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servicesItem}>
                    <Image source={ImgGroomer} style={styles.serviceImage}/>
                    <Text style={styles.serviceTitle}>GROOMER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servicesItem}>
                    <Image source={ImgBlog} style={styles.serviceImage}/>
                    <Text style={styles.serviceTitle}>BLOG</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default servicesCard;

const styles = StyleSheet.create({
    servicesContainer: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
    },

    servicesItem: {
        flex: 1,
        borderWidth: .4,
        borderColor: "#999",
        height: 110,
        marginHorizontal: 4,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    serviceImage: {
        width: 70,
        height: 70,
        resizeMode: "cover",
        marginBottom: 5,
        borderRadius: 100,
    },

    serviceTitle: {
        color: "#444",
        fontWeight: "bold",
    }
});