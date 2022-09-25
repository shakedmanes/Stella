import { createContext, useContext } from "react";
import { types, Instance, onSnapshot } from "mobx-state-tree";

import { AlarmSoundTypes, MotionSensitivityLevels, ROOT_STATE_STORAGE_KEY } from "../constants/config";
import Storage from "../utils/storage";
import Settings from "./models/settings";

const RootStore = types.model({
    settings: Settings
});

const store = RootStore.create({
    settings: Settings.create()
});

export interface IRootStore extends Instance<typeof RootStore> {}

onSnapshot(store, (snapshot) => Storage.save(ROOT_STATE_STORAGE_KEY, snapshot));

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const RootStoreContext = createContext<IRootStore>(store as IRootStore);

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = RootStoreContext.Provider

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = () => useContext(RootStoreContext);

export default store;