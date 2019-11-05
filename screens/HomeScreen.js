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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isModalVisible: false,
    isModalVisibleAboutUs: false,
    isModalVisiblePopUp: true,
    isModalVisibleLogin: false,
    starCount: 0,
    islogin: false,
    imageURL: ''
  };

  //star rating changing
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  //rating modal toggle
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleModalLogin = () => {
    this.setState({ isModalVisibleLogin: !this.state.isModalVisibleLogin });
  };

  //About us modal toggle
  toggleModalAboutUs = () => {
    this.setState({ isModalVisibleAboutUs: !this.state.isModalVisibleAboutUs });
  };

 
  //popUp message first time

  isModalVisiblePopUpScreen = () => {
    this.setState({ isModalVisiblePopUp: !this.state.isModalVisiblePopUp });
  };

  //when click on login the islogin will turn to true
  login = () => {
    this.setState({ islogin: true });
  }


  _loginWithGoogle = async function () {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "21542702296-hva5e7il78auksec7a9b0372jlle6d9t.apps.googleusercontent.com",
        iosClientId: "21542702296-jdnu5ctoqt6c54k9qrcmmgtmimr4sm7g.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        let that = this
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(res => {
            firebase.auth().onAuthStateChanged(function (user) {
              if (user) {
                let image = firebase.auth().currentUser.photoURL;
                if (image !== '') {
                  that.setState({ imageURL: image })
                }
              } else {
                // No user is signed in.
              }
            });
            this.setState({ islogin: true });
            this.toggleModalLogin();
            // this.props.navigation.navigate('Main')
            console.log("Successful");
          })
          .catch(error => {
            console.log("firebase cred err:-------------------------------------", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };


  async loginWithFacebook() {


    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('657999701277646', {
        permissions: ['email', 'public_profile'],
      });
      let that = this;
      let image
      if (type === 'success') {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            image = user.providerData[0].photoURL;
            if (image !== '') {
              that.setState({ imageURL: image })
            }
          } else {
            // No user is signed in.
          }
        });
        // let image = firebase.auth().currentUser.photoURL;
        if (image !== '') {
          this.setState({ imageURL: image })
        }
        this.setState({ islogin: true });
        this.toggleModalLogin();
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        // this.props.navigation.navigate('Main')
        firebase.auth().signInWithCredential(credential).catch((error) => {
          console.log(error)
        })
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal isVisible={this.state.isModalVisiblePopUp}
          onBackdropPress={() => this.setState({ isModalVisiblePopUp: false })}
        >
          <View style={styles.ModalViewPopUp}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.PopupTitle}>Why should I login?</Text>
              <Text style={styles.Popupdesc}>Your Progress{"\n"}Your Score{"\n"}Ranking on Genius-Board Under this key!</Text>
            </View>

          </View>
        </Modal>

        <Modal isVisible={this.state.isModalVisibleLogin}
          onBackdropPress={() => this.setState({ isModalVisibleLogin: false })}
        >
          <View style={{ padding: 20, borderRadius: 6, backgroundColor: '#fff' }}>
            <Text style={{ textAlign: 'center', marginBottom: 15 }}>Login with</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this._loginWithGoogle()} style={{ padding: 10 }}>
                <Image style={{ width: 40, height: 40, marginRight: 20 }} source={require('../assets/images/google.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.loginWithFacebook()} style={{ padding: 10 }}>
                <Image style={{ width: 40, height: 40, marginLeft: 20 }} source={require('../assets/images/fb.png')} />
              </TouchableOpacity>
            </View>

          </View>
        </Modal>


        <Modal isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <View style={styles.ModalView}>
            {/* <Text style={styles.ModalTitle}>Bize Ulas</Text> */}
            <View style={{ alignItems: 'center' }}>


              {this.state.starCount === 0 ? (
                <Image style={styles.ModalBird} source={require('../assets/images/normal.png')} />

              ) : (
                  null
                )}

              {this.state.starCount > 3 ? (
                <Image style={styles.ModalBird} source={require('../assets/images/4star.png')} />

              ) : (
                  null
                )}

              {this.state.starCount > 0 && this.state.starCount < 4 ? (
                <Image style={styles.ModalBird} source={require('../assets/images/3star.png')} />

              ) : (
                  null
                )}

              {this.state.starCount > 0 && this.state.starCount < 4 ? (
                <Text style={styles.Modaltext2}>Share your feedback, please!</Text>

              ) : (
                  null
                )}

              {this.state.starCount > 3 ? (
                <Text style={styles.Modaltext2}>Rate us on store?</Text>

              ) : (
                  null
                )}

              {this.state.starCount === 0 ? (
                <View>
                  <Text style={styles.Modaltext1}>Your feedback matters to us<Image style={{ height: 15, width: 15 }} source={require('../assets/images/smile.png')} /></Text>

                  <Text style={styles.Modaltext2}>How did you find Wing app?</Text>
                </View>

              ) : (
                  null
                )}


              <StarRating
                disabled={false}
                maxStars={5}
                emptyStarColor='#b2b2b2'
                fullStarColor='#f9c92b'
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />

            </View>


            {this.state.starCount > 0 && this.state.starCount < 4 ? (
              <View>
                <Form style={{ marginTop: 15 }}>
                  <View style={{ borderColor: '#b2b2b2', borderRadius: 1.5, borderWidth: 1.4, paddingTop: 5, width: '80%', alignSelf: 'center' }}>
                    <Textarea rowSpan={3} placeholderTextColor='#b2b2b2' placeholder="Yorum yazmak ister misiniz? " />
                  </View>
                </Form>

                <View style={{ alignItems: 'center', marginTop: 16 }}>
                  <TouchableOpacity onPress={this.toggleModal} style={{ borderColor: '#b2b2b2', borderWidth: 1, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, borderRadius: 25, backgroundColor: '#009900' }}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
                null
              )}

            {this.state.starCount > 0 ? (
              null
            ) : (
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={{ color: '#808080', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Maybe Later</Text>
                </TouchableOpacity>
              )}

            {this.state.starCount > 3 ? (
              <View>
                <View style={{ alignItems: 'center', marginTop: 16 }}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('https://play.google.com/store/apps/details?id=com.whatsapp').catch(err => console.error('An error occurred', err));
                    }}
                    style={{ borderColor: '#b2b2b2', borderWidth: 1, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, borderRadius: 25, backgroundColor: '#009900' }}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>yes!</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={{ color: '#808080', fontSize: 16, textAlign: 'right', marginTop: 20, marginRight: 10 }}>Maybe Later</Text>
                </TouchableOpacity>
              </View>
            ) : (
                null
              )}

          </View>
        </Modal>


        <Modal isVisible={this.state.isModalVisibleAboutUs}
          onBackdropPress={() => this.setState({ isModalVisibleAboutUs: false })}
        >
          <View style={styles.ModalView}>
            <View style={styles.cancelbtn}>
              <TouchableOpacity onPress={this.toggleModalAboutUs} style={styles.cancelbtn2}>
                <Icon.Entypo name="cross" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: '15%' }}>
              <Image style={styles.icon} source={require('../assets/images/icon.png')} />

              <Text style={styles.Modaltext3}>Wing</Text>

              <Text style={styles.Modaltext4}>Telent Development Guide</Text>

              <Text style={styles.Modaltext5}>Make your resume valueable and visible.{"\n"}We ensure that you are always ready for interviews.</Text>

              <Text style={styles.Modaltext6}>Follow us!</Text>

              <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <TouchableOpacity onPress={() => {
                  Linking.openURL('https://www.linkedin.com/company/ikarushr/').catch(err => console.error('An error occurred', err));
                }}
                >
                  <Icon.Entypo name="linkedin" size={30} color="#000" style={{ paddingRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity TouchableOpacity onPress={() => {
                  Linking.openURL('https://www.instagram.com/wing_ikarus/').catch(err => console.error('An error occurred', err));
                }}>
                  <Icon.AntDesign name="instagram" size={30} color="#000" style={{ paddingLeft: 10, marginTop: 2 }} />
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </Modal>

        {this.state.islogin ? (
          <View style={{ flexDirection: 'row', position: 'absolute', top: 20, right: 20 }}>

            <TouchableOpacity onPress={this.toggleModal} style={{ justifyContent: 'center' }}>
              <Icon.Ionicons style={{ padding: 10 }} name="ios-information-circle-outline" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleModalAboutUs} style={{ justifyContent: 'center' }}>
              <View style={{ borderColor: '#000', borderRadius: 60, paddingLeft: 2.5, paddingRight: 2.5, paddingTop: 2, paddingBottom: 2, borderWidth: 1.6 }}>
                <Icon.MaterialCommunityIcons name="email-variant" size={15} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (

            <View style={{ flexDirection: 'row', position: 'absolute', top: 45, right: 20 }}>

              <TouchableOpacity onPress={this.toggleModal} style={{ justifyContent: 'center' }}>
                <Icon.Ionicons style={{ padding: 10 }} name="ios-information-circle-outline" size={41} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleModalAboutUs} style={{ justifyContent: 'center' }}>
                <View style={{ borderColor: '#000', borderRadius: 60, paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5, borderWidth: 2.2 }}>
                  <Icon.MaterialCommunityIcons name="email-variant" size={19} color="#000" />
                </View>
              </TouchableOpacity>
            </View>
          )}

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {this.state.islogin ? (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Profile')
              }}>
              <View>
                {this.state.imageURL === '' ? (
                  <Icon.FontAwesome name="user-circle-o" size={70} color="#000" />

                ) : (
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 50 }}
                      source={{ uri: this.state.imageURL }}
                    />
                  )}

              </View>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity onPress={this.toggleModalLogin}>
                <View style={{ marginTop: 10, borderColor: '#000', borderRadius: 60, paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 6, borderWidth: 2.2 }}>
                  <Icon.SimpleLineIcons name="lock" size={35} color="#000" />
                </View>
              </TouchableOpacity>
            )}
        </View>

        <View style={{ flexDirection: 'row', marginTop: 55, paddingLeft: '10%', paddingRight: '10%' }}>



          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderRightColor: '#000', borderRightWidth: 0.6, paddingBottom: 20 }}>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
              <Icon.Entypo style={styles.icons} size={40} name="upload" color="#000" />
              <Text style={styles.IconText}>Send CV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Tabs')
              }}
              style={{ justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
              <Icon.SimpleLineIcons style={styles.icons} size={40} name="book-open" color="#000" />
              <Text style={styles.IconText}>Learn</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
              <Icon.AntDesign style={styles.icons} size={40} name="linechart" color="#000" />
              <Text style={styles.IconText}>Discover</Text>
            </TouchableOpacity>
          </View>



          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 20 }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
              <Image style={{ width: 40, height: 40 }} source={require('../assets/images/four-squares.png')} />
              <Text style={styles.IconText}>Enneagram</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
              <Icon.Ionicons style={styles.icons} size={40} name="md-alarm" color="#000" />
              <Text style={styles.IconText}>Practice</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 55 }}>
              <Icon.Foundation style={styles.icons} size={40} name="target" color="#000" />
              <Text style={styles.IconText}>Search Job</Text>
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
