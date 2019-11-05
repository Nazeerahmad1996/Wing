import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';


export default class LinksScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    //navigate to home screen
    _onDone = () => {
        this.props.navigation.push('HomeScreen')
    }

    _renderDoneButton = () => {
        return (
            <View style={styles.letsStart}>
                <TouchableOpacity onPress={this._onDone} style={styles.startbtn}>
                    <Text style={{ color: '#fff' }}>Let's Start</Text>
                </TouchableOpacity>
            </View>
        );
    }


    render() {

        //Slides Data comes from this array

        const slides = [
            {
                key: '1',
                title: 'Welcome to Wing!\nWe’re here to rocket your IT career!',
                titleStyle: styles.sliderTitle,
                // text: 'Solve Enneagram,\nFind the right job',
                textStyle: styles.slideText,
                image: require('../assets/images/normal.png'),
                imageStyle: styles.image1,
                backgroundColor: '#fff',
            },
            {
                key: '2',
                title: 'We make your CV valuable\nand visible with AI tech.',
                titleStyle: styles.sliderTitle,
                // text: 'Solve Enneagram,\nFind the right job',
                textStyle: styles.slideText,
                image: require('../assets/images/Sliderone.png'),
                imageStyle: styles.image2,
                backgroundColor: '#fff',
            },
            {
                key: '3',
                title: "We've prepared lots of\ntools to guide your career!",
                titleStyle: styles.sliderTitle,
                // text: 'Solve Enneagram,\nFind the right job',
                textStyle: styles.slideText,
                image: require('../assets/images/Sliderthree.png'),
                imageStyle: styles.image3,
                backgroundColor: '#fff',
            },
        ];

        return (
            //this is the slider
            <AppIntroSlider
                slides={slides}
                //done button
                renderDoneButton={this._renderDoneButton}
                //done label
                doneLabel="Let's Start!"
                activeDotStyle={{backgroundColor: 'rgba(0, 153, 0, .9)'}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    image1: {
        width: 165,
        height: 165,
    },
    image2: {
        width: 165,
        height: 160,
    },
    image3: {
        width: 160,
        height: 160,
    },
    slideText: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.1,
        marginTop: -35,
    },
    sliderTitle: {
        fontSize: 18,
        marginTop: 35,
        textAlign: 'center',
        fontWeight: '500',
        color: '#000'
    },
    startbtn: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        backgroundColor: '#009900',
        borderRadius: 20
    },
    letsStart: {
        marginTop: 6
    },
    activeDot:{
        color:'#009900',
    }
});
