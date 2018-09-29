import React, { Component } from 'react';
import { View, Text, AsyncStorage, Alert, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'
import { httpClient } from './HttpClient'
import { StackActions, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import ProfileScreen from './ProfileScreen'

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home Screen'
  // };
  
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      feedData: '',
      dataSource: this.list
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>Home</Text>
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

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          return <Icon name='home' size={25} color='#000000' />
        } else if (routeName === 'Profile') {
          return <Icon name='menu' size={25} color='#000000' />
        }
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

