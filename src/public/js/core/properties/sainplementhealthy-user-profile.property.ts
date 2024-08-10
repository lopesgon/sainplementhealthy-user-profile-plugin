declare var sainplementhealthy_user_profile_plugin_public_properties: {
  pluginUrl: string,
}

interface ISainplementhealthyUserProfileProperties {
  getPluginUrl: string,
}

const cookiesMadeSimpleProperties: ISainplementhealthyUserProfileProperties = {
  getPluginUrl: sainplementhealthy_user_profile_plugin_public_properties.pluginUrl,
}

export { cookiesMadeSimpleProperties }
export type { ISainplementhealthyUserProfileProperties }
