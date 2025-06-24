import React from "react";
import { AppButton, AppText, Spacer } from "@app/components";
import { TextInput, View } from "react-native";
import ProgressIndicator from "./ProgressIndicator";
import { styles } from "./styles";
import UserFormStepOne from "@app/components/UserFormStepOne";

function UserFormStepThree({ formData, onBack, onSubmit, onUpdate }) {
    return (
        <View>
            <ProgressIndicator step={3} total={3} />
            <Spacer value={20} />
            <AppText poppinsSemiBold size={18}>About yourself</AppText>
            <TextInput
                style={styles.textArea}
                placeholder="What should others know"
                value={formData.about}
                onChangeText={(text) => onUpdate({ about: text })}
                multiline
                numberOfLines={4}
            />
            <Spacer value={20} />
            <AppButton onPress={onSubmit}>Skip</AppButton>
        </View>
    );
}

export default UserFormStepThree