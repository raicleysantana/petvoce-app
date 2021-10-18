import React, {Component, useEffect, useState} from 'react';
import Slideshow from "react-native-image-slider-show";


export default class BannerHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            interval: null,
            dataSource: [
                {url: 'https://images.tcdn.com.br/img/img_prod/560844/1616685663_molecao_banner_app_royal_canin.png'},
                {url: 'https://hospitalveterinariosaude.com.br/wp-content/uploads/2019/10/redes-sociais-hvs.png'},
                {url: 'https://images.tcdn.com.br/img/img_prod/560844/1617539078_molecao_banner_app_pro_plan.png'}
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