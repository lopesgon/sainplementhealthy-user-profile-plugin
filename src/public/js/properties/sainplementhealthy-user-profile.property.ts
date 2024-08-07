declare var sainplementhealthy_user_profile_plugin_public_properties: {
  exampleBoolean: boolean,
  pluginName: string
}

interface ISainplementhealthyUserProfileProperties {
  showCookieDescription: boolean,
  getPluginName: string,
}

const cookiesMadeSimpleProperties: ISainplementhealthyUserProfileProperties = {
  showCookieDescription: sainplementhealthy_user_profile_plugin_public_properties.exampleBoolean,
  getPluginName: sainplementhealthy_user_profile_plugin_public_properties.pluginName,
}

export { cookiesMadeSimpleProperties }
export type { ISainplementhealthyUserProfileProperties }
