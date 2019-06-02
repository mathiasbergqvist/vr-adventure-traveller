import React from "react";
import {
  asset,
  AppRegistry,
  Text,
  View,
  Environment,
  VrButton
} from "react-360";
import styles from "./styles";
import destinations from "./data/destinations";
import { getBackgrounds } from "./api/api";
import Entity from "Entity";

class Models extends React.Component {
  render() {
    return (
      <View>
        <Entity
          style={{
            color: "#333d84",
            transform: [
              { scaleX: 0.15 },
              { scaleY: 0.15 },
              { scaleZ: 0.15 },
              { translateY: 0.9 },
              { translateX: -3 },
              { rotateX: 50 },
              { rotateY: -35 }
            ]
          }}
          source={{ obj: asset("plane.obj") }}
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
          currentDestinationId: 0,
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
    this.setState({
      currentDestinationId: id
    });
    Environment.setBackgroundImage({
      uri: this.getCurrentDestinationById(id).background
    });
  }

  render() {
    return (
      <View>
        <View style={styles.panel}>
          <Text style={styles.welcomeHeader}>
            React 360 adventure traveller
          </Text>
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
        <Models />
      </View>
    );
  }
}

AppRegistry.registerComponent(
  "VrAdventureTraveller",
  () => VrAdventureTraveller
);
AppRegistry.registerComponent("Models", () => Models);
