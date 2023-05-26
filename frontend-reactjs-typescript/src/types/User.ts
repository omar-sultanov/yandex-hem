import { Bool } from 'reselect/es/types';

export interface IUser {
  status: string;
  request_id: string;
  rooms: [
    {
      id: string;
      name: string;
      household_id: string;
      devices: [string];
    },
  ];
  groups: [];
  devices: [
    img:string | undefined,
    status: string,
    request_id: string,
    id: string,
    name: string,
    aliases: [string],
    type: string,
    external_id: string,
    skill_id: string,
    state: string,
    groups: [],
    room: string,
    capabilities: [
      {
        retrievable: boolean;
        type: string;
        parameters: {
          split: boolean;
        };
        state: {
          instance: string;
          value: boolean;
        };
        last_updated: BigInt;
      },
    ],
    properties: [
      {
        retrievable: boolean;
        type: string;
        parameters: {
          instance: string;
          unit: string;
        };
        state: {
          instance: string;
          value: number;
        };
        last_updated: BigInt;
      },
      {
        retrievable: boolean;
        type: string;
        parameters: {
          instance: string;
          unit: string;
        };
        state: {
          instance: string;
          value: number;
        };
        last_updated: BigInt;
      },
      {
        retrievable: boolean;
        type: string;
        parameters: {
          instance: string;
          unit: string;
        };
        state: {
          instance: string;
          value: number;
        };
        last_updated: BigInt;
      },
    ],
    scenarios: [
      {
        id: string;
        name: string;
        is_active: boolean;
      },
    ],
    households: [
      {
        id: string;
        name: string;
      },
    ],
  ];
}
