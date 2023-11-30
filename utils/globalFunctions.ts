import Geolocation from 'react-native-geolocation-service';
import ImageCropPicker from 'react-native-image-crop-picker';

export const getUserLocation = (successCallback: Function) => {
  Geolocation.getCurrentPosition(
    position => {
      successCallback?.(position);
    },
    error => {
      // See error code charts below.
      console.log('Error', error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

export const openMobileCamera = async () => {
  const options: any = {
    width: 400,
    height: 400,
    quality: 1,
  };

  try {
    const data: any = await ImageCropPicker.openCamera(options);

    return data;
  } catch (error) {
    console.log(error);
  }
};
