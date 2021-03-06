import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import DismissKeyboard from "../../../components/DismissKeyboard";
import DeleteSwipe from "../../../components/DeleteSwipe";

import ListEmpty from "../../../components/ListEmpty";
import HeaderRight from "../../../components/HeaderRight";
import { Category } from "../../../interface";
import { useDispatch, useSelector } from "react-redux";
import { loadRequestAction } from "../../../services/store/ducks/category/actions";
import { StoreState } from "../../../services/store/createStore";
import { doRemoveCategory } from "../../../services/category";

const CategoryScreen: React.FC = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { data: categories, loading, error } = useSelector(
    (state: StoreState) => state.category
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => navigation.navigate("NewEditCategory")} />
      ),
    });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    getCategories();
  }, []);

  function getCategories() {
    dispatch(loadRequestAction());
  }

  function handleToEditCategory(category: Category) {
    navigation.navigate("NewEditCategory", {
      isNewCategory: false,
      category: category,
    });
  }

  const renderItemList = ({ item, index }: ListRenderItemInfo<Category>) => (
    <DeleteSwipe
      titleDelete="Remover categoria"
      messageDelete="Tem certeza que deseja remover?"
      onDelete={(ref) => {
        setLoadingScreen(true);
        doRemoveCategory(item.id)
          .then((remove) => {
            getCategories();
          })
          .catch((e) => {})
          .then((_) => {
            setLoadingScreen(false);
          });
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.card}
        key={String(item.id)}
        delayPressIn={20}
        onPress={() => handleToEditCategory(item)}
      >
        <Text style={styles.cardTitle}>{item.name}</Text>

        <Ionicons name="md-arrow-forward" size={20} color="#05375a" />
      </TouchableOpacity>
    </DeleteSwipe>
  );

  return (
    <>
      {loadingScreen && <ActivityIndicator />}
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 12,
        }}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={categories || []}
        renderItem={renderItemList}
        ListEmptyComponent={<ListEmpty />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="carregando.."
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 12,
    alignItems: "center",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    marginVertical: 3,
  },
});

export default CategoryScreen;
