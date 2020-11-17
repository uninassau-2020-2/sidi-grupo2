import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ListEmpty from "../../../components/ListEmpty";
import DeleteSwipe from "../../../components/DeleteSwipe";
import HeaderRight from "../../../components/HeaderRight";
import { roleUserToString } from "../../../util";
import { ApplicationState } from "../../../services/store";
import {
  RepositoriesTypes,
  Repository,
} from "../../../services/store/ducks/repositories/types";
import { doRemoveUser } from "../../../services/user";

export default function UsersScreen() {
  const navigation = useNavigation();

  const { data: users, loading } = useSelector(
    (state: ApplicationState) => state.repositories
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  function getUsers() {
    dispatch({ type: RepositoriesTypes.LOAD_REQUEST });
  }

  const onRefresh = useCallback(() => {
    getUsers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => navigation.navigate("NewEditUser")} />
      ),
    });
  }, [navigation]);

  function handleToEditUser() {
    navigation.navigate("NewEditUser", {
      isNewUser: false,
    });
  }

  const renderItemList = ({ item, index }: ListRenderItemInfo<Repository>) => (
    <DeleteSwipe
      titleDelete="Remover usuário"
      messageDelete="Tem certeza que deseja remover?"
      onDelete={async () => {
        setLoadingScreen(true);
        doRemoveUser(item.id)
          .then((remove) => {
            getUsers();
          })
          .catch((e) => {})
          .then((_) => {
            setLoadingScreen(false);
          });
        // setUsers(users.filter((item, indexItem) => indexItem !== index));
      }}
    >
      <TouchableOpacity style={styles.card} onPress={handleToEditUser}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${item.name}`,
          }}
          style={styles.cardImage}
        />
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>{item.email || "--"}</Text>
        </View>
        <Text style={styles.cardValue}>{roleUserToString(item.role)}</Text>
        <Ionicons
          name="md-arrow-forward"
          size={20}
          color="gray"
          style={{ color: "#05375a", marginLeft: 12 }}
        />
      </TouchableOpacity>
    </DeleteSwipe>
  );

  const renderListOfProduct = () => (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1,
        marginHorizontal: 6,
        marginTop: 12,
      }}
      keyExtractor={(item, index) => String(index)}
      data={users || []}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  );

  return (
    <>
      {loadingScreen && <ActivityIndicator />}
      {renderListOfProduct()}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardValue: {
    fontSize: 16,
    color: "#babec5",
  },

  cardDescription: {
    color: "#a2abbb",
  },
  separator: {
    marginVertical: 3,
  },
});
