import { StyleSheet } from "react-native";
import { Colors } from "@app/utils";

export const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.LightGrey,
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 8,
        color: Colors.White,
    },
    textArea: {
        height: 120,
        borderColor: Colors.LightGrey,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        color: Colors.White,
    },
    selected: {
        borderColor: Colors.SkyBlue,
        borderWidth: 2,
    },
});
