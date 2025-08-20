export const TRANSLATION_CONFIG = {
  'character': {
    tableName: 'character_translation',
    title: 'Character Translations',
    description: 'Manage character-related translations'
  },
  'etc': {
    tableName: 'etc_translation',
    title: 'Etc Translations',
    description: 'Manage etc-related translations'
  },
  'honor-list': {
    tableName: 'honorlist_translation',
    title: 'Honor List Translations',
    description: 'Manage honor list translations'
  },
  'lord-skills': {
    tableName: 'lordskill_translation',
    title: 'Lord Skills Translations',
    description: 'Manage lord skills translations'
  },
  'prop-items': {
    tableName: 'propitem_translation',
    title: 'Prop Items Translations',
    description: 'Manage prop items translations'
  },
  'prop-item-etc': {
    tableName: 'propitemetc_translation',
    title: 'Prop Item Etc Translations',
    description: 'Manage prop item etc translations'
  },
  'prop-karma': {
    tableName: 'propkarma_translation',
    title: 'Prop Karma Translations',
    description: 'Manage prop karma translations'
  },
  'prop-combo-box-data': {
    tableName: 'propmapcomboboxdata_translation',
    title: 'Prop Combo Box Data Translations',
    description: 'Manage prop combo box data translations'
  },
  'prop-motion': {
    tableName: 'propmotion_translation',
    title: 'Prop Motion Translations',
    description: 'Manage prop motion translations'
  },
  'prop-mover': {
    tableName: 'propmover_translation',
    title: 'Prop Mover Translations',
    description: 'Manage prop mover translations'
  },
  'prop-skill': {
    tableName: 'propskill_translation',
    title: 'Prop Skill Translations',
    description: 'Manage prop skill translations'
  },
  'prop-troupe-skill': {
    tableName: 'proptroupeskill_translation',
    title: 'Prop Troupe Skill Translations',
    description: 'Manage prop troupe skill translations'
  },
  'quest-destination': {
    tableName: 'questdestination_translation',
    title: 'Quest Destination Translations',
    description: 'Manage quest destination translations'
  },
  'resdata': {
    tableName: 'resdata_translation',
    title: 'Resdata Translations',
    description: 'Manage resdata translations'
  },
  'text-client': {
    tableName: 'textclient_translation',
    title: 'Text Client Translations',
    description: 'Manage text client translations'
  },
  'world': {
    tableName: 'world_translation',
    title: 'World Translations',
    description: 'Manage world translations'
  },
} as const

export type TranslationType = keyof typeof TRANSLATION_CONFIG
