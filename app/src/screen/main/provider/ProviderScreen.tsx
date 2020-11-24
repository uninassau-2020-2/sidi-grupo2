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
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSwipe, HeaderRight, ListEmpty } from "../../../components";
import { loadRequestAction } from "../../../services/store/ducks/provider/actions";
import { Provider } from "../../../interface";
import { StoreState } from "../../../services/store/createStore";
import { doRemoveProvider } from "../../../services/provider";

const ProviderScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { data: providers, loading, error } = useSelector(
    (state: StoreState) => state.provider
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    getProviders();
  }, []);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => navigation.navigate("NewEditProvider")} />
      ),
    });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    getProviders();
  }, []);

  function getProviders() {
    dispatch(loadRequestAction());
  }

  function handleToEditProvider(provider: Provider) {
    navigation.navigate("NewEditProvider", {
      isNewProvider: false,
      provider: provider,
    });
  }

  const renderItem = (provider: Provider) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      key={String(provider.id)}
      onPress={() => handleToEditProvider(provider)}
    >
      <View
        style={{
          marginLeft: 6,
          flex: 1,
        }}
      >
        <Text style={styles.cardTitle}>{provider.companyName}</Text>
        <Text style={styles.cardDescription}>cnpj: {provider.cnpj}</Text>
      </View>
      <Ionicons
        name="md-arrow-forward"
        size={20}
        color="gray"
        style={{ color: "#05375a" }}
      />
    </TouchableOpacity>
  );

  const renderItemList = ({ item, index }: ListRenderItemInfo<Provider>) => (
    <DeleteSwipe
      titleDelete="Remover fornecedor"
      messageDelete="Tem certeza que deseja remover?"
      onDelete={(ref) => {
        setLoadingScreen(true);
        doRemoveProvider(item.id)
          .then((remove) => {
            getProviders();
          })
          .catch((e) => {})
          .then((_) => {
            setLoadingScreen(false);
          });
      }}
    >
      {renderItem(item)}
    </DeleteSwipe>
  );

  return (
    <>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 12,
        }}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={providers || []}
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
  separator: {
    marginVertical: 3,
  },
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    margin: 12,
    alignItems: "center",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardDescription: {
    color: "#a2abbb",
    marginBottom: 15,
  },
});

export default ProviderScreen;
