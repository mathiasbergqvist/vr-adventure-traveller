import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-360";
import styles from "./styles";
import destinations from "./data/destinations";

export default class VrAdventureTraveller extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDestinationId: 0,
      destinations: destinations
    };
  }

  render() {
    return (
      <View style={stylesDefault.panel}>
        <Text style={styles.welcomePanel}>React VR adventure traveller</Text>
        <View style={styles.menuWrapper}>
          {this.state.destinations.map(destination => {
            return (
              <View style={styles.menuItem} key={destination.id}>
                <Text style={styles.menuItemText}>
                  {destination.description}
                </Text>
              </View>
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
