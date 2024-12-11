import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import * as Location from "expo-location";

export const pickImageFromGallery = async () => {
  // Request permission to access media library
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "We need access to your media to upload images."
    );
    return;
  }

  // Launch the image picker (images only)
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow images only
    quality: 1,
  });

  if (!result.canceled) {
    const selectedImage = result.assets[0];
    return {
      success: true,
      type: "success",
      message: "Image selected successfully.",
      uri: selectedImage.uri,
      mimeType: selectedImage.mimeType,
      width: selectedImage.width,
      height: selectedImage.height,
      fileName: selectedImage.fileName,
    };
  } else {
    console.log("User canceled image picker");
    return {
      success: false,
      type: "error",
      message: "Image selected unSuccessfully.",
      uri: "",
    };
  }
};

export const getMyLocation = async () => {
  // Request location permission
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Permission to access location was denied"
    );
    return {
      success: false,
      message: "Permission to access location was denied",
      data: null,
    };
  }

  try {
    // Get the current location (latitude and longitude)
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;

    // Reverse geocode to get more details like country, state, etc.
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const { country, region: state, city, street } = reverseGeocode[0]; // region gives the state

      // Alert.alert(
      //   "Location Retrieved",
      //   `Lat: ${latitude}, Lon: ${longitude}, Country: ${country}, State: ${state}, City: ${city}`
      // );

      return {
        success: true,
        message: "Location fetched successfully.",
        data: {
          lat: latitude,
          lon: longitude,
          country,
          state,
          city,
          street,
        },
      };
    } else {
      return {
        success: false,
        message: "Unable to fetch location details.",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error fetching location: " + error.message,
      data: null,
    };
  }
};
