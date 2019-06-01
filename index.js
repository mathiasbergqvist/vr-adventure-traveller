import React from "react";
import {
  asset,
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
import {
  getLavaPlanet,
  getAeroplane,
  getSkull,
  getBarrel,
  getBox
} from "./models";
import Entity from "Entity";

class Models extends React.Component {
  render() {
    return (
      <View>
        <Entity
          style={{
            color: "#ffffff",
            transform: [{ scaleX: 0.1 }, { scaleY: 0.1 }, { scaleZ: 0.1 }]
          }}
          source={{ obj: asset("skull.obj") }}
          wireframe={true}
        />
      </View>
    );
  }
}

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
          currentDestination: 0,
          destinations: destinationsWithBackgroundImage
        });
        Environment.setBackgroundImage({
          uri: destinationsWithBackgroundImage[0].background
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

  get3dShape() {
    switch (this.state.currentDestinationId) {
      case 0:
        return getLavaPlanet();
      case 1:
        return getAeroplane();
      case 2:
        return getSkull();
      case 3:
        return getBarrel();
      case 4:
        return getBox();
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.panel}>
        <Text style={styles.welcomeHeader}>React 360 adventure traveller</Text>
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

AppRegistry.registerComponent(
  "VrAdventureTraveller",
  () => VrAdventureTraveller
);
AppRegistry.registerComponent("Models", () => Models);
