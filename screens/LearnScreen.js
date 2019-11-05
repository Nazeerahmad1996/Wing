import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Card, CardItem, Body, Text } from 'native-base';
import Icon from 'react-native-vector-icons';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
//dummy data for flatlist
var data =
    [
        {
            "id": "1",
            "title": "General/ Trick",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
        },
        {
            "id": "2",
            "title": "General/ Technology",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
        },
        {
            "id": "3",
            "title": "General/ Trick",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
        },
        {
            "id": "4",
            "title": "General/ Trick",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
        },
        {
            "id": "5",
            "title": "General/ Trick",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
        },
        {
            "id": "6",
            "title": "General/ Trick",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex eacommodo consequat."
        },
    ]


export default class LinksScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            isModalVisible: false,
            initialPage: 0,
            activeTab: 0,
            Category: false,
            message: '',
            messages: [],

        }
    }

    //filter modal toggle
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    //filter click
    Filter() {
        this.setState({ Category: true, isModalVisible: !this.state.isModalVisible, activeTab: 0 });


    }

    savedPost = (item) => {
        console.log(item.id)
        if (item.Saved === "True") {
            firebase.database().ref("Questions").child(item.id).update({
                Saved: "False"
            }).then((data) => {
                //success callback

            }).catch((error) => {
                //error callback

            })
        }
        else {
            firebase.database().ref("Questions").child(item.id).update({
                Saved: "True"
            }).then((data) => {
                //success callback

            }).catch((error) => {
                //error callback

            })
        }
    }

    componentDidMount() {


        // setTimeout(() => {
        //     this.setState({ activeTab: 2 });
        // }, 0);

        //data fetching from firebase and save into message[]

        firebase
            .database()
            .ref()
            .child('Questions')
            .on("value", snapshot => {

                const data = snapshot.val()
                if (snapshot.val()) {
                    const initMessages = [];
                    Object
                        .keys(data)
                        .forEach(message => initMessages.push(data[message]));
                    this.setState({
                        messages: initMessages,

                    });
                }
            });
    }

    render() {

        return (
            <Container>

                <Modal isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={styles.ModalView}>

                        <View style={{ alignItems: 'center' }}>
                            <View>
                                <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, borderColor: '#7c92b2', borderWidth: 1, borderRadius: 6 }}>
                                    <Text style={{ color: '#7c92b2' }}>Select Category</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#7c92b2', borderWidth: 1, backgroundColor: '#9aabc4', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># Algorithms</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>


                                    <TouchableOpacity onPress={() => this.Filter()} style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#ff9429', borderWidth: 1, backgroundColor: '#ffb366', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># General</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#7c92b2', borderWidth: 1, backgroundColor: '#9aabc4', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># AI</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#7c92b2', borderWidth: 1, backgroundColor: '#9aabc4', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}>#  Network</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#7c92b2', borderWidth: 1, backgroundColor: '#9aabc4', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># Database</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#ff9429', borderWidth: 1, backgroundColor: '#ffb366', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># AI</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#7c92b2', borderWidth: 1, backgroundColor: '#9aabc4', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}>#  SDLC</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#7c92b2', borderWidth: 1, backgroundColor: '#9aabc4', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># DevPractices</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, borderColor: '#ff9429', borderWidth: 1, backgroundColor: '#ffb366', borderRadius: 3, marginLeft: 3, marginRight: 3 }}>
                                        <Text style={styles.btnColor}># Mobile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                    </View>
                </Modal>



                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: 25 }}>
                    <View>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack(null) }}>
                            <Icon.Ionicons name="ios-arrow-back" size={30} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: '500' }}>HR Questions</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <Icon.FontAwesome name="filter" size={30} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* if no filter then this one will render */}
                {!this.state.Category ? (
                    <Tabs locked tabBarUnderlineStyle={{ height: 0 }} tabContainerStyle={{ elevation: 0, height: 49 }}>
                        <Tab heading="HR questions" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
                            <View>
                                <FlatList
                                    data={this.state.messages}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) =>

                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Text style={styles.CardTitle}>
                                                        {item.Cat}
                                                    </Text>
                                                    <Text style={styles.CardDesc}>
                                                        {item.Desc}
                                                    </Text>

                                                    <View style={{ flexDirection: 'row', marginTop: 15, paddingBottom: 10, justifyContent: 'center' }}>
                                                        <View>
                                                            <Text>Wing</Text>
                                                        </View>
                                                        {item.Saved === 'True' ? (
                                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                <TouchableOpacity onPress={() => this.savedPost(item)}>
                                                                    <Icon.FontAwesome name="bookmark" size={23} color="#000" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        ) : (
                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => this.savedPost(item)}>
                                                                        <Icon.FontAwesome name="bookmark-o" size={23} color="#000" />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )}
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableOpacity>
                                                                <Icon.FontAwesome name="heart-o" size={20} color="#000" />
                                                            </TouchableOpacity>
                                                            <Text style={{ fontSize: 14, marginLeft: 2 }}>{item.Likes}</Text>
                                                        </View>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    }
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </Tab>
                        <Tab heading="IT Questions" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

                        </Tab>
                        <Tab heading="Ask to Employer" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>

                        </Tab>
                        <Tab heading="Best Company Questions" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diets} activeTextStyle={styles.activetabs_text_diets}>
                            <View>
                                <FlatList
                                    data={data}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) =>

                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Text style={styles.CardTitle}>
                                                        {item.title}
                                                    </Text>
                                                    <Text style={styles.CardDesc}>
                                                        {item.desc}
                                                    </Text>

                                                    <View style={{ flexDirection: 'row', marginTop: 15, paddingBottom: 10, justifyContent: 'center' }}>
                                                        <View>
                                                            <Text>Wing</Text>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity>
                                                                <Icon.FontAwesome name="bookmark" size={23} color="#000" />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableOpacity>
                                                                <Icon.FontAwesome name="heart-o" size={20} color="#000" />
                                                            </TouchableOpacity>
                                                            <Text style={{ fontSize: 14, marginLeft: 2 }}>12</Text>
                                                        </View>
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    }
                                    keyExtractor={item => item.id}
                                />
                            </View>

                        </Tab>
                    </Tabs>
                ) : (
                        <Tabs locked tabBarUnderlineStyle={{ height: 0 }} tabContainerStyle={{ elevation: 0, height: 49 }}>
                            <Tab heading="Recent" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diet} activeTextStyle={styles.activetabs_text_diet}>
                                <View>
                                    <FlatList
                                        data={this.state.messages}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) =>

                                            <Card>
                                                <CardItem>
                                                    <Body>
                                                        <Text style={styles.CardTitle}>
                                                            {item.Cat}
                                                        </Text>
                                                        <Text style={styles.CardDesc}>
                                                            {item.Desc}
                                                        </Text>

                                                        <View style={{ flexDirection: 'row', marginTop: 15, paddingBottom: 10, justifyContent: 'center' }}>
                                                            <View>
                                                                <Text>Wing</Text>
                                                            </View>
                                                            {item.Saved === 'True' ? (
                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => this.savedPost(item)}>
                                                                        <Icon.FontAwesome name="bookmark" size={23} color="#000" />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            ) : (
                                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <TouchableOpacity onPress={() => this.savedPost(item)}>
                                                                            <Icon.FontAwesome name="bookmark-o" size={23} color="#000" />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )}
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TouchableOpacity>
                                                                    <Icon.FontAwesome name="heart-o" size={20} color="#000" />
                                                                </TouchableOpacity>
                                                                <Text style={{ fontSize: 14, marginLeft: 2 }}>{item.Likes}</Text>
                                                            </View>
                                                        </View>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        }
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </Tab>
                            <Tab heading="Top" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diet} activeTextStyle={styles.activetabs_text_diet}>

                            </Tab>
                            <Tab heading="All" tabStyle={styles.tabs_diets} activeTabStyle={styles.activetabs_diets} textStyle={styles.tabs_text_diet} activeTextStyle={styles.activetabs_text_diet}>

                            </Tab>
                        </Tabs>
                    )}

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    tabs_diets: {
        backgroundColor: '#253137',
    },
    activetabs_diets: {
        backgroundColor: '#253137',
    },
    tabs_text_diets: {
        color: '#a6abb1',
        fontWeight: 'normal',
        fontSize: 11,
        textAlign: 'center'
    },
    activetabs_text_diets: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 11,
        textAlign: 'center'
    },
    tabs_text_diet: {
        color: '#a6abb1',
        fontWeight: 'normal',
        fontSize: 17
    },
    activetabs_text_diet: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 17
    },
    CardTitle: {
        fontWeight: '500'
    },
    CardDesc: {
        fontSize: 14,
        marginTop: 10
    },
    ModalView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8
    },
    btnColor: {
        color: '#fff',
        fontSize: 13
    }
});
