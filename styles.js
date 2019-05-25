import { StyleSheet } from "react-360";

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeHeader: {
    backgroundColor: "#ef5350",
    fontSize: 75,
    fontWeight: "400",
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ translate: [485, 120, -5] }]
  },
  menuWrapper: {
    width: 800,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    transform: [{ translate: [-5, 120, -7.5] }]
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#ef5350"
  },
  menuItemText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  }
});

export default styles;
