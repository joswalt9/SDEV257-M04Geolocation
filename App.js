import React, { useState, useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";

StatusBar.setBarStyle("dark-content");

export default () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      // Request permission for location access
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        // setLocation({ latitude: 39.62509, longitude: -86.10563 });
        return;
      }

      // Get the user's current location
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);
    };

    getLocation();
  }, []);

  //Restaurant Location
  const restaurant = {
    latitude: 39.63145,
    longitude: -86.11475,
    title: "Dominos",
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapView}
          showsUserLocation
          followUserLocation
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.title}
            description={restaurant.description}
          />
        </MapView>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};
