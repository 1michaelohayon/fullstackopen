import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }
  getAcessToken() {
    const token = AsyncStorage.getItem(`${this.namespace}:token`)
    return token
  }

  setAcessToken(acessToken) {
    const newToken = AsyncStorage.setItem(`${this.namespace}:token`, acessToken)
    console.log(newToken);
  }

  removeAcessToken() {
    AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage
