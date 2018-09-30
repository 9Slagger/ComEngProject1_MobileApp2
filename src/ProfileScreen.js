import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, Alert, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { TabNavigator, TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'
// import { httpClient } from './HttpClient'
import { StackActions, NavigationActions } from 'react-navigation';

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      feedData: {
        username: "loading...",
        firstname: "loading...",
        lastname: "loading...",
        phone: "loading...",
        address: "loading...",
        allergy_history: "loading...",
        birthday: "loading...",
        record_date: "loading...",
      },
      dataSource: this.list
    }
    // this.feed()

    // httpClient
    //   .get('/feed')
    //   .then(result => {
    //     Alert.alert(JSON.stringify(result.data))
    //   })
  }

  goHomeScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  async logout() {
    await AsyncStorage.clear()
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    this.myuser()
  }

  async myuser() {
    const token = await AsyncStorage.getItem("token")

    axios.get('https://immense-tundra-42908.herokuapp.com/api/v1/myuser',
      { headers: { 'x-access-token': token } })
      .then(response => {
        const result = response.data
        result.birthday = result.birthday.split("T");
        result.record_date = result.record_date.split("T");
        this.setState({ feedData: result })
        console.log(this.state.feedData)
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error))
        console.log(error);
      });
  }

  render() {
    return (
      <View >

        <Card title="My Profile">
          {<ListItem roundAvatar title={'Account: ' + this.state.feedData.username}/>}
          {<ListItem roundAvatar title={'Firstname: ' + this.state.feedData.firstname}/>}
          {<ListItem roundAvatar title={'Lastname: ' + this.state.feedData.lastname}/>}
          {<ListItem roundAvatar title={'Phone: ' + this.state.feedData.phone}/>}
          {<ListItem roundAvatar title={'Address: ' + this.state.feedData.address}/>}
          {<ListItem roundAvatar title={'Allergy: ' + this.state.feedData.allergy_history}/>}
          {<ListItem roundAvatar title={'Birthday: ' + this.state.feedData.birthday[0]}/>}
          {<ListItem roundAvatar title={'Join Date: ' + this.state.feedData.record_date[0]}/>}
        </Card>

        <TouchableHighlight
          onPress={() => this.logout()}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableHighlight>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  fronData: {
    fontSize: 18,
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    paddingTop: 80
  },
  banner: {
    height: 90,
    width: '100%'
  },
  input: {
    height: 50,
    width: '100%',
    marginTop: 10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec33'
  },
  loginButton: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center'
  },
  registerButton: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  loginButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    color: '#0007',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
    marginBottom: 40
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default ProfileScreen;
