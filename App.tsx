/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  checkCameraPermission,
  requestLocationPermission,
} from './utils/requestPermission';
import {getUserLocation, openMobileCamera} from './utils/globalFunctions';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [media, setMedia] = useState([null, null, null, null]);
  const [coordinates, setCoordinates] = useState([null, null, null, null]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    checkCameraPermission();
    requestLocationPermission();
  }, []);

  const setImageCoordinates = (angle: angles) => {
    getUserLocation(position => {
      let positions: any = [...coordinates];

      const currentCoordinates = {
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude,
      };
      switch (angle) {
        case 'front':
          positions[0] = currentCoordinates;
          break;
        case 'back':
          positions[1] = currentCoordinates;
          break;
        case 'left':
          positions[2] = currentCoordinates;
          break;
        case 'right':
          positions[3] = currentCoordinates;
          break;

        default:
          break;
      }
      setCoordinates(positions);
    });
  };

  const openCamera = async (angle: angles) => {
    const image: any = await openMobileCamera();
    let medias: any = [...media];

    switch (angle) {
      case 'front':
        medias[0] = image;
        break;
      case 'back':
        medias[1] = image;
        break;
      case 'left':
        medias[2] = image;
        break;
      case 'right':
        medias[3] = image;
        break;

      default:
        break;
    }
    setMedia(medias);
    setImageCoordinates(angle);
  };

  const removeImage = (index: number) => {
    const medias = [...media];
    const positions = [...coordinates];
    medias[index] = null;
    positions[index] = null;
    setMedia(medias);
    setCoordinates(positions);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        {media[0] ? (
          <View style={{marginLeft: 20, marginTop: 10}}>
            <ImageBackground
              source={{uri: media[0]?.path}}
              style={{height: 120, width: 240}}
              borderRadius={10}
              resizeMode="cover">
              <Pressable
                onPress={() => removeImage(0)}
                style={styles.clearContainer}>
                <Text style={{color: 'black'}}>clear</Text>
              </Pressable>
            </ImageBackground>
            {coordinates[0] ? (
              <Text
                style={
                  styles.latlongText
                }>{`Latitude ${coordinates[0]?.latitude} , Longitude ${coordinates[0]?.longitude}`}</Text>
            ) : null}
          </View>
        ) : (
          <Pressable
            style={{marginLeft: 20, marginTop: 10}}
            onPress={() => openCamera('front')}>
            <Text>Front Picture</Text>
          </Pressable>
        )}
        {media[1] ? (
          <View style={{marginLeft: 20, marginTop: 10}}>
            <ImageBackground
              source={{uri: media[1]?.path}}
              style={{height: 120, width: 240}}
              borderRadius={10}
              resizeMode="cover">
              <Pressable
                onPress={() => removeImage(1)}
                style={styles.clearContainer}>
                <Text style={{color: 'black'}}>clear</Text>
              </Pressable>
            </ImageBackground>
            {coordinates[1] ? (
              <Text
                style={
                  styles.latlongText
                }>{`Latitude ${coordinates[1]?.latitude} , Longitude ${coordinates[1]?.longitude}`}</Text>
            ) : null}
          </View>
        ) : (
          <Pressable
            style={{marginLeft: 20, marginTop: 10}}
            onPress={() => openCamera('back')}>
            <Text>Back Picture</Text>
          </Pressable>
        )}
        {media[2] ? (
          <View style={{marginLeft: 20, marginTop: 10}}>
            <ImageBackground
              source={{uri: media[2]?.path}}
              style={{height: 120, width: 240}}
              borderRadius={10}
              resizeMode="cover">
              <Pressable
                onPress={() => removeImage(2)}
                style={styles.clearContainer}>
                <Text style={{color: 'black'}}>clear</Text>
              </Pressable>
            </ImageBackground>
            {coordinates[2] ? (
              <Text
                style={
                  styles.latlongText
                }>{`Latitude ${coordinates[2]?.latitude} , Longitude ${coordinates[2]?.longitude}`}</Text>
            ) : null}
          </View>
        ) : (
          <Pressable
            style={{marginLeft: 20, marginTop: 10}}
            onPress={() => openCamera('left')}>
            <Text>Left Picture</Text>
          </Pressable>
        )}
        {media[3] ? (
          <View style={{marginLeft: 20, marginTop: 10}}>
            <ImageBackground
              source={{uri: media[3]?.path}}
              style={{height: 120, width: 240}}
              borderRadius={10}
              resizeMode="cover">
              <Pressable
                onPress={() => removeImage(3)}
                style={styles.clearContainer}>
                <Text style={{color: 'black'}}>clear</Text>
              </Pressable>
            </ImageBackground>
            {coordinates[3] ? (
              <Text
                style={
                  styles.latlongText
                }>{`Latitude ${coordinates[3]?.latitude} , Longitude ${coordinates[3]?.longitude}`}</Text>
            ) : null}
          </View>
        ) : (
          <Pressable
            style={{marginLeft: 20, marginTop: 10}}
            onPress={() => openCamera('right')}>
            <Text>Right Picture</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

type angles = 'front' | 'back' | 'left' | 'right';

const styles = StyleSheet.create({
  clearContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
    position: 'absolute',
    right: 4,
    top: 4,
  },
  latlongText: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default App;
