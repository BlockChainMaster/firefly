import Vue from 'vue'
import Vuex from 'vuex'
import AccountsStore from './modules/AccountsStore'
import AppSettingStore from './modules/AppSettingStore'
import AccountStore from './modules/AccountStore'
import AssetStore from './modules/AssetStore'
import createPersist from './plugins/persistence'
import { APP_NAME, APP_VERSION } from '@/api/gateways'
var Base64 = require('js-base64').Base64

Vue.use(Vuex)

const state = {
  showloading: false,
  error: null,
  isImportAccount: false,
  isCreateAccount: false,
  seed: null,
  seedExtData: null,
  accountname: null,
  accountpassword: null,
  memo: null,
  iosstatusbarcolor: 'primary',
  onpause: false,//is app on pause
  
}

const getters = {
  
}

const actions = {
  importAccountChange({commit}){
    commit(IMPORT_ACCOUNT_CHANGE)
  },
  createAccountChange({commit}){
    commit(CREATE_ACCOUNT_CHANGE)
  },
  backToAccount({commit}){
    commit(BACK_TO_ACCOUNT)
  },
  setNewSeed({commit},{seed,extdata}){
    commit(SET_NEW_SEED,{seed,extdata})
  },
  setCreateAccountData({commit}, {name,password,memo}){
    commit(SET_CREATE_ACCOUNT_DATA, {name,password, memo})
  },
  showLoading({commit}){
    commit(SHOW_LOADING)
  },
  hidenLoading({commit}){
    commit(HIDEN_LOADING)
  },
  cleanGlobalState({commit}){
    commit(CLEAN_GLOBAL_STATE)
  },
  onPause({commit}){
    commit(ON_PAUSE)
  },
  onResume({commit}){
    commit(ON_RESUME)
  }
  

}

const mutations = {
  IMPORT_ACCOUNT_CHANGE(state){
    state.isImportAccount = true
    state.isCreateAccount = false
  },
  CREATE_ACCOUNT_CHANGE(state){
    state.isImportAccount = false
    state.isCreateAccount = true
  },
  BACK_TO_ACCOUNT(state){
    state.isImportAccount = false
    state.isCreateAccount = false
  },
  GLOBAL_ERROR(state,err){
    state.error = err
  },
  SET_NEW_SEED(state,{seed,extdata}){
    state.seed = seed
    state.seedExtData = extdata
  },
  SET_CREATE_ACCOUNT_DATA(state,{name,password,memo}){
    state.name = name
    state.password = password
    state.memo = memo
  },
  SHOW_LOADING(state){
    state.showloading = true
  },
  HIDEN_LOADING(state){
    state.showloading = false
  },
  CLEAN_GLOBAL_STATE(state){
    state.seed = null
    state.seedExtData= null
    state.accountname= null
    state.accountpassword= null
    state.memo= null
  },
  CHANGE_IOSSTATUSBAR_COLOR(state,color){
    state.iosstatusbarcolor = color
  },
  ON_PAUSE(state){
    state.onpause = true
  },
  ON_RESUME(state){
    state.onpause = false
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    accounts: AccountsStore,
    app: AppSettingStore,
    account: AccountStore,
    asset: AssetStore
  },

})

function serialize(value){
  return Base64.encode(JSON.stringify(value))
}

function deserialize(value){
  return JSON.parse(Base64.decode(value))
}

export const IMPORT_ACCOUNT_CHANGE = 'IMPORT_ACCOUNT_CHANGE'
export const CREATE_ACCOUNT_CHANGE = 'CREATE_ACCOUNT_CHANGE'
export const BACK_TO_ACCOUNT = 'BACK_TO_ACCOUNT'
export const GLOBAL_ERROR = 'GLOBAL_ERROR'
export const SET_NEW_SEED = 'SET_NEW_SEED'
export const SET_CREATE_ACCOUNT_DATA = 'SET_CREATE_ACCOUNT_DATA'
export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDEN_LOADING = 'HIDEN_LOADING'
export const CLEAN_GLOBAL_STATE = 'CLEAN_GLOBAL_STATE'
export const CHANGE_IOSSTATUSBAR_COLOR = 'CHANGE_IOSSTATUSBAR_COLOR'
export const ON_PAUSE = 'ON_PAUSE'
export const ON_RESUME = 'ON_RESUME'