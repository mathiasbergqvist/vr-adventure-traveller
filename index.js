import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  VrButton
} from "react-360";
import styles from "./styles";
import destinations from "./data/destinations";
import { getBackgrounds } from "./api/api";

export default class VrAdventureTraveller extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDestinationId: 0,
      destinations: destinations
    };
  }

  componentWillMount() {
    getBackgrounds(this.state.destinations).then(
      destinationsWithBackgroundImage => {
        this.setState({
          background: destinationsWithBackgroundImage[0].background,
          currentDestination: 0,
          destinations: destinationsWithBackgroundImage
        });
      }
    );
  }

  getCurrentDestinationById(id) {
    return this.state.destinations.find(destination => destination.id === id);
  }

  travelToDestination(id) {
    console.log("travelToDestination", id);
    this.setState({
      currentDestinationId: id
    });
    Environment.setBackgroundImage({
      uri: this.getCurrentDestinationById(id).background
    });
  }

  render() {
    return (
      <View style={stylesDefault.panel}>
        <Text style={styles.welcomePanel}>React 360 adventure traveller</Text>
        <View style={styles.menuWrapper}>
          {this.state.destinations.map(destination => {
            return (
              <VrButton
                style={styles.menuItem}
                key={destination.id}
                onClick={() => {
                  this.travelToDestination(destination.id);
                }}
              >
                <Text style={styles.menuItemText}>
                  {destination.description}
                </Text>
              </VrButton>
            );
          })}
        </View>
      </View>
    );
  }
}

const stylesDefault = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2
  },
  greeting: {
    fontSize: 30
  }
});

AppRegistry.registerComponent(
  "VrAdventureTraveller",
  () => VrAdventureTraveller
);
