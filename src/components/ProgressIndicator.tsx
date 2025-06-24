import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@app/utils";

export default function ProgressIndicator({ step, total }) {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.bar,
                    { flex: step, backgroundColor: Colors.SkyBlue },
                ]}
            />
            <View
                style={[
                    styles.bar,
                    { flex: total - step, backgroundColor: Colors.Grey },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 8,
        borderRadius: 4,
        overflow: "hidden",
        marginVertical: 10,
    },
    bar: {
        height: "100%",
    },
});
