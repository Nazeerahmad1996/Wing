import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
    Alert
} from 'react-native';
import { WebBrowser } from 'expo';
import firebase from 'firebase';

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons';
import { Container, Header, Content, Textarea, Form } from "native-base";

import StarRating from 'react-native-star-rating';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        imageURL: ''
    };

    SignOut = (navigation) => {
        firebase.auth().signOut().then(function () {
            this.navigation.navigate('HomeScreen')
        }, function (error) {

        });
    }

    componentDidMount() {
        let that = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                let image = firebase.auth().currentUser.photoURL;
                console.log("-------------------------", image)
                if (image !== '') {
                    that.setState({ imageURL: image })
                }
            } else {
                // No user is signed in.
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 15 }}>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 5, right: 20 }}>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('HomeScreen')
                        }}
                            style={{ justifyContent: 'center' }}>
                            <Icon.FontAwesome style={{ padding: 10 }} name="sign-out" size={28} color="#000" />
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity>
                        <View>
                            {this.state.imageURL === '' ? (
                                <Icon.FontAwesome name="user-circle-o" size={50} color="#f29191" />

                            ) : (
                                    <Image
                                        style={{ width: 80, height: 80, borderRadius: 50 }}
                                        source={{ uri: this.state.imageURL }}
                                    />
                                )}

                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: 55, paddingLeft: '10%', paddingRight: '10%' }}>



                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderRightColor: '#000', borderRightWidth: 0.6, paddingBottom: 20 }}>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Icon.AntDesign style={styles.icons} size={40} name="areachart" color="#000" />
                            <Text style={styles.IconText}>My Progress</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
                            <Icon.SimpleLineIcons style={styles.icons} size={40} name="trophy" color="#000" />
                            <Text style={styles.IconText}>G-Board</Text>
                        </TouchableOpacity>

                    </View>



                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 20 }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Icon.Octicons style={styles.icons} size={40} name="bookmark" color="#000" />
                            <Text style={styles.IconText}>My Library</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
                            <Icon.MaterialCommunityIcons style={styles.icons} size={40} name="comment-check-outline" color="#000" />
                            <Text style={styles.IconText}>C-Wall</Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '12%'
    },
    loginText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 19,
        textDecorationLine: 'underline',
        marginTop: 25,
    },
    PopupTitle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 19,
        textDecorationLine: 'underline',
        marginTop: 5,
        fontWeight: '500'
    },
    Popupdesc: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 19,
        fontWeight: '500'

    },
    icon: {
        width: 70,
        height: 70,
    },
    sharebtn: {
        width: 55,
        height: 55,
    },
    IconText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5
    },
    navText: {
        color: '#fff',
        fontSize: 11,
        marginTop: 5,
        marginBottom: 5,
        letterSpacing: 0.1
    },
    icons: {
        // width: 35,
        // height: 35,
    },
    navIcon1: {
        width: 26,
        height: 26
    },
    navIcon2: {
        width: 13,
        height: 26
    },
    navIcon3: {
        width: 26,
        height: 26
    },
    navIcon4: {
        width: 26,
        height: 26
    },
    ModalView: {
        backgroundColor: '#fff',
        padding: 10,
        paddingBottom: 40,
        borderRadius: 5
    },
    ModalViewPopUp: {
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        padding: 10,
        paddingBottom: 40,
        borderRadius: 5
    },
    ModalTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
    },
    ModalBird: {
        height: 110,
        width: 110,
        marginTop: 40
    },
    cancelbtn: {
        alignItems: 'flex-end',
        marginTop: -36,
        marginRight: -10

    },
    cancelbtn2: {
        padding: 2,
        backgroundColor: '#fff',
        borderRadius: 80,
    },
    Modaltext1: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: '500'
    },
    Modaltext2: {
        marginTop: 15,
        fontSize: 15,
        marginBottom: 10,
        fontWeight: '500'
    },
    Modaltext3: {
        fontSize: 26,
        marginTop: '13%',
        color: '#892f2e'
    },
    Modaltext4: {
        fontSize: 22,
        marginTop: 10,
        letterSpacing: 0.1,
        color: '#892f2e'
    },
    Modaltext5: {
        fontSize: 13,
        textAlign: 'center',
        marginTop: 17,
    },
    Modaltext6: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 17,
    }
});
