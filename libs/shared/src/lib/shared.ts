export const enum SubComponent {
  FE_SNIFIT = 'FE_SNIFIT',
  MS_BFF = 'MS_BFF',
  MS_ACCOUNTS = 'MS_ACCOUNTS',
  MS_RISK = 'MS_RISK',
  MS_LOANS = 'MS_LOANS',
  CORE_ODS = 'CORE_ODS',
  ODS_GENERATOR = 'ODS_GENERATOR',
  ODS_DB = 'ODS_DB',
}

export interface ISubComponentProps {
  port: number;
  host: string;
  scheme: string;
  name: string;
  path: string;
}

interface ISubComponentConfigMapping {
  [key: string]: ISubComponentProps;
}

export const subComponentConfigs: ISubComponentConfigMapping = {
  // Layer 2
  [SubComponent.MS_BFF]: {
    scheme: 'http',
    host: 'localhost',
    port: 8001,
    name: 'Backend for Frontend',
    path: '',
  },
  [SubComponent.ODS_GENERATOR]: {
    scheme: 'http',
    host: 'localhost',
    port: 8002,
    name: 'ODS Data Generator',
    path: 'ods-generator',
  },

  // Layer 3
  [SubComponent.MS_RISK]: {
    scheme: 'http',
    host: 'localhost',
    port: 8010,
    name: 'MS - Risk',
    path: '/ms-risk',
  },
  [SubComponent.MS_LOANS]: {
    scheme: 'http',
    host: 'localhost',
    port: 8011,
    name: 'MS - Loans',
    path: '/ms-loans',
  },
  [SubComponent.MS_ACCOUNTS]: {
    scheme: 'http',
    host: 'localhost',
    port: 8012,
    name: 'MS - Accounts',
    path: '/ms-accounts',
  },

  // Layer 4
  [SubComponent.CORE_ODS]: {
    scheme: 'http',
    host: 'localhost',
    port: 8020,
    name: 'Core - ODS',
    path: '/core-ods',
  },

  // Layer 5
  [SubComponent.ODS_DB]: {
    scheme: 'http',
    host: 'localhost',
    port: 8030,
    name: 'ODS DB',
    path: '/ods-db',
  },
};

export const getComponentBaseURL = (subComp: SubComponent): string => {
  const config = subComponentConfigs[subComp];

  return `${config.scheme}://${config.host}:${config.port}`;
};
