import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import PhoneInput from "react-native-phone-number-input";
import {
  BorderRadii,
  Colors,
  FontSizes,
  Fonts,
  Spacing,
} from "../../utils/styles";

const FormInput = ({
  label,
  placeholder,
  searchInputPlaceholder,
  onSearchInputChange,
  onChangeText,
  type,
  value,
  keyboardType,
  options,
  customStyle,
  error,
}) => {
  const [focus, setFocus] = useState(false);

  const ref = useRef(null);

  const BottomSheetBackground = ({ style }) => {
    return (
      <View
        style={[
          {
            backgroundColor: "white",
            borderRadius: 20,
          },
          { ...style },
        ]}
      />
    );
  };

  if (type === "phone") {

    return (
      <View style={{ marginBottom: Spacing.s }}>
        <Text style={styles.label}>{label}</Text>
        <PhoneInput
          value={value}
          defaultCode="GH"
          containerStyle={styles.formInput}
          textContainerStyle={{
            width: "100%",
            backgroundColor: "#fff",
          }}
          textInputStyle={{
            fontFamily: Fonts.regular,
            fontSize: 14,
          }}
          codeTextStyle={{
            fontFamily: Fonts.regular,
            fontSize: 14,
          }}
          placeholder="018 9384 9393"
          textInputProps={{
            placeholderTextColor: "#CDCDCD",
          }}
          onChangeFormattedText={onChangeText}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  if (type === "select") {
    return (
      <View style={{ marginBottom: Spacing.s }}>
        <Text style={[styles.label]}>{label}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.formInput, styles.select, customStyle]}
          onPress={() => {
            ref.current.present();
          }}
        >
          <Text
            style={[
              styles.selectText,
              {
                color: value ? Colors.primary : Colors.text_muted,
              },
            ]}
          >
            {value ?? placeholder}
          </Text>
          <FontAwesome5 name="chevron-down" size={14} color={"#999999"} />
        </TouchableOpacity>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={["85%"]}
          enablePanDownToClose={true}
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          backgroundComponent={(props) => <BottomSheetBackground {...props} />}
          keyboardBlurBehavior="restore"
          handleComponent={() => null}
        >
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <View style={styles.searchContainer}>
                <Feather name="search" size={24} color={"#999999"} />
                <TextInput
                  style={styles.searchInput}
                  placeholder={searchInputPlaceholder}
                  placeholderTextColor={"#999999"}
                  onChange={(e) => onSearchInputChange(e.nativeEvent.text)}
                />
              </View>
            </View>
            <ScrollView style={styles.list}>
              {options &&
                options.map((item) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.item}
                    onPress={() => {
                      onChangeText(item);
                      ref.current.close();
                    }}
                    key={item}
                  >
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </BottomSheetModal>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: Spacing.s }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChange={(e) => {
          onChangeText(e.nativeEvent.text);
        }}
        style={[
          styles.input,
          {
            borderColor: focus ? Colors.primary : Colors.bg_whitesmoke,
          },
          customStyle,
        ]}
        keyboardType={keyboardType}
        placeholderTextColor={"#CDCDCD"}
        value={value}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: Colors.text_muted,
    marginBottom: Spacing.s,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.bg_whitesmoke,
    borderRadius: 5,
    padding: Spacing.m,
    marginBottom: Spacing.s,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xm,
  },

  errorText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
    color: Colors.text_danger,
    marginBottom: Spacing.s,
  },

  formInput: {
    padding: 2,
    marginVertical: Spacing.s,
    borderWidth: 1,
    borderColor: Colors.bg_whitesmoke,
    borderRadius: BorderRadii.s,
    fontFamily: Fonts.regular,
    width: "100%",
  },

  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 21,
  },

  selectText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.text_muted,
  },

  contentContainer: {
    flex: 1,
  },

  header: {
    padding: Spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
    borderRadius: 16,
    padding: Spacing.l,
  },

  searchInput: {
    flex: 1,
    marginLeft: Spacing.s,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },

  list: {
    padding: Spacing.l,
    height: "100%",
    marginBottom: Spacing.l,
  },

  item: {
    paddingVertical: Spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  itemText: {
    fontFamily: Fonts.regular,
  },
});
