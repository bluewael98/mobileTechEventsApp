import { StyleSheet, Text, View } from "react-native";

import Events from "../../components/Events";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10, alignItems: "center", gap: 25 }}>
        <Text style={styles.title}>
          All your tech events in one place, made easy.
        </Text>
        <Text>
          Explore all your nearby tech events conveniently gathered in one
          place, tailor-made for your convenience. Say goodbye to the hassle of
          navigating various social media apps, simply start searching below.
        </Text>
      </View>
      <Events />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
