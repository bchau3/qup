import React from "react";
import { Text, Image, View, StyleSheet, ScrollView } from "react-native";

export default function SongQueue(props) {
  const songs = JSON.parse(props.songlist);
  //this.state.dataSource.cloneWithRows(responseJson.map(item => item.name))

  return (
    <View>
      <ScrollView>
        {props.map((item, index) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    margin: 2,
    borderColor: "#2a4944",
    borderWidth: 1,
    backgroundColor: "#d2f7f1"
  }
});
