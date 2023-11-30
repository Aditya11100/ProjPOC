import {request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';

export const requestLocationPermission = (successCallback?: Function) => {
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    } as never),
  )
    .then(Response => {
      if (Response === 'granted' || Response === 'limited') {
        successCallback?.();
      } else if (Response === 'blocked' || Response === 'denied') {
        console.log('Location Permission Denied');
      } else if (Response === 'unavailable') {
        console.log('Location service not available');
      }
    })
    .catch(err => {
      console.log('ERROR', err);
    });
};

export const checkCameraPermission = (successCallback?: Function) => {
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    } as never),
  )
    .then(Response => {
      if (Response === 'granted' || Response === 'limited') {
        successCallback?.();
      } else if (Response === 'blocked' || Response === 'denied') {
        console.log('Camera Permission Denied');
      } else if (Response === 'unavailable') {
        console.log('Camera service not available');
      }
    })
    .catch(err => {
      console.log('ERROR', err);
    });
};
