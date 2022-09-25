import AsyncStorage from "@react-native-async-storage/async-storage"

export default class Storage {

    /**
     * Loads something from storage and runs it thru JSON.parse.
     *
     * @param key The key to fetch.
     */
    static async load(key: string): Promise<any | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            return null
        }
    }

    /**
     * Saves an object to storage.
     *
     * @param key The key to fetch.
     * @param value The value to store.
     */
    static async save(key: string, value: any): Promise<boolean> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * Removes something from storage.
     *
     * @param key The key to kill.
     */
    static async remove(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            // nothing to do
        }
    }

    /**
     * Burn it all to the ground.
     */
    static async clear(): Promise<void> {
        try {
            await AsyncStorage.clear()
        } catch (error) {
            // nothing to do
        }
    }
}