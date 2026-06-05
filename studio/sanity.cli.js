import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'nutut50l',
    dataset: 'production',
  },
  studioHost: 'zengest',
  deployment: {
    appId: 'z2dbjgvh22q3ir98j4d73tgv',
  },
})
