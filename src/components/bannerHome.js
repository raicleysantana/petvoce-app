import React, {Component, useEffect, useState} from 'react';
import Slideshow from "react-native-image-slider-show";


export default class BannerHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            interval: null,
            dataSource: [
                {url: 'https://meupet.vet.br/wp-content/uploads/2014/01/banner-petshop-1.png'},
                {url: 'https://www.clinicaeobicho.com.br/wp-content/uploads/2019/07/Banho-Tosa.jpg'},
                {url: 'https://www.clinicaeobicho.com.br/wp-content/uploads/2019/07/Consultas-Diagnostico.jpg'},
                {url: 'https://lh3.googleusercontent.com/proxy/SsPvxyne_OaMg-kc7lGge3Lu7aIOGnfy5HaFQjQvAxUMnZEDqUW4Jt1_KsL8QmEw-HZX9JU70Jr6wxjfJGRuST1XIWIk0akFzCttuhEugst_ed2ocySvxt3q4E0LqC1g0udmZ2Ty35JOtm264z2UFMheWgNSFYY7MpsuFj4'},
            ]
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 6000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <>
                <Slideshow
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}
                    dataSource={this.state.dataSource}
                />
            </>
        )
    };
}