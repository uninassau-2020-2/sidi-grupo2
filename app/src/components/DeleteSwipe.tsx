import React, { MutableRefObject, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Alert,
} from "react-native";

import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

interface IDeleteSwipe {
  titleDelete?: string;
  messageDelete?: string;
  onDelete: (ref: Swipeable | null) => void;
  children: any;
}

const DeleteSwipe = ({
  titleDelete = "Remover",
  messageDelete = "Tem certeza que deseja remover?",
  onDelete,
  children,
}: IDeleteSwipe) => {
  const swipeableRef = useRef<Swipeable | null>(null);

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      Alert.alert(
        titleDelete,
        messageDelete,
        [
          {
            text: "Cancel",
            onPress: () => {
              close();
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              onDelete(swipeableRef.current);
              close();
            },
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => (
    <View
      style={{
        width: 100,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {/* {this.renderRightAction('More', '#C8C7CD', 192, progress)}
      {this.renderRightAction('Flag', '#ffab00', 128, progress)} */}
      {renderRightAction("Remover", "#dd2c00", 64, progress)}
    </View>
  );

  const close = () => {
    swipeableRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableClose={close}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default DeleteSwipe;
