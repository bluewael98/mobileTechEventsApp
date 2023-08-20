import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

const placeholder = {
  id: "1",
  attributes: {
    eventTitle: "Loading",
    eventDescription: undefined,
    eventLocation: "loading",
    createdAt: "...",
    updatedAt: "...",
    publishedAt: "...",
    eventLogo: {
      data: [
        {
          id: "loading",
          attributes: {
            url: "loading",
            alternativeText: "",
          },
        },
      ],
    },
    events: {
      data: null,
    },
  },
};

const placeholderData = {
  data: [placeholder, placeholder, placeholder],
  meta: {
    pagination: {
      page: "loading..",
      pageSize: "loading..",
      pageCount: "loading..",
      total: "loading..",
    },
  },
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: "contain",
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "white",
  },
  appleButton: {
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "#63b1fc",
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  androidButton: {},
  container: {
    borderRadius: 20,
    borderColor: "#63b1fc",
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    alignItems: "flex-start",
    padding: 10,
    gap: 20,
  },
  logoContainer: {
    borderRadius: 50,
    borderColor: "#63b1fc",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
});

export default function Events() {
  const [events, setEvents]: any = React.useState(placeholderData);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [description, setDescription] = React.useState(false);

  React.useEffect(() => {
    fetch(
      `https://waelportfolio-backend.onrender.com/api/events?filters[timestampt]&sort[0]=timestamp:desc&pagination[page]=${pageNumber}&pagination[pageSize]=6&populate=deep,2`
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [pageNumber]);
  console.log(events);

  const Card = ({
    imageSrc,
    eventTitle,
    eventLocation,
    evenDescription,
  }: any) => (
    <View
      style={{
        justifyContent: "flex-start",
        gap: 20,
        width: "100%",
        paddingHorizontal: 20,
        shadowColor: "#63b1fc",
      }}
    >
      <View
        style={{
          borderRadius: 30,
          borderColor: "black",
          borderRightWidth: 6,
          borderBottomWidth: 6,
          borderTopWidth: 0,
          borderLeftWidth: 0,
        }}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: imageSrc,
              }}
              style={styles.logo}
              alt="icon"
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{eventTitle}</Text>
          <Text>Location: {eventLocation}</Text>

          <TouchableOpacity
            onPress={
              description
                ? () => setDescription(false)
                : () => setDescription(!false)
            }
            style={{
              width: "100%",
              paddingVertical: 20,
              alignItems: "center",
              ...Platform.select({
                ios: styles.appleButton,
                android: styles.androidButton,
              }),
            }}
          >
            <Text style={{ color: "white" }}>
              {(description && "CLOSE") || "SHOW MORE"}
            </Text>
          </TouchableOpacity>
          {description && (
            <View>
              <Text>{evenDescription}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        justifyContent: "flex-start",
        gap: 20,
        width: "100%",
        paddingHorizontal: 20,
        shadowColor: "#63b1fc",
      }}
    >
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          data={events.data}
          renderItem={(data: any) => (
            <Card
              imageSrc={data.attributes.eventLogo.data[0].attributes.url}
              eventTitle={data.attributes.eventTitle}
              eventLocation={data.attributes.eventLocation}
              evenDescription={data.attributes.evenDescription}
            />
          )}
        />
      </SafeAreaView>
      {/* {events &&
        events.data.map((data: any, index: number) => (
          <View
            key={index}
            style={{
              borderRadius: 30,
              borderColor: "black",
              borderRightWidth: 6,
              borderBottomWidth: 6,
              borderTopWidth: 0,
              borderLeftWidth: 0,
            }}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  source={{
                    uri: data.attributes.eventLogo.data[0].attributes.url,
                  }}
                  style={styles.logo}
                  alt="icon"
                />
              </View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {data.attributes.eventTitle}
              </Text>
              <Text>Location: {data.attributes.eventLocation}</Text>

              <TouchableOpacity
                onPress={
                  description
                    ? () => setDescription(false)
                    : () => setDescription(!false)
                }
                style={{
                  width: "100%",
                  paddingVertical: 20,
                  alignItems: "center",
                  ...Platform.select({
                    ios: styles.appleButton,
                    android: styles.androidButton,
                  }),
                }}
              >
                <Text style={{ color: "white" }}>
                  {(description && "CLOSE") || "SHOW MORE"}
                </Text>
              </TouchableOpacity>
              {description && (
                <View>
                  <Text>{data.attributes.evenDescription}</Text>
                </View>
              )}
            </View>
          </View>
        ))} */}
    </View>
  );
}
