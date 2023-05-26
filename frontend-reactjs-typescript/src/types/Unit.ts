export interface Property {
  parameters: {
    instance: string;
    unit: string;
  };
  state: {
    instance: string;
    value: number;
  };
}
export interface Unit {
  img:string | undefined,
  id: string;
  name: string;
  aliases: [string];
  type: string;
  external_id: string;
  skill_id: string;
  household_id: string;
  room: string;
  groups: [string];
  capabilities: [
    {
      reportable: Boolean;
      retrievable: Boolean;
      type: string;
      parameters: {};
      state: {};
      last_updated: number;
    },
    {
      reportable: Boolean;
      retrievable: Boolean;
      type: string;
      parameters: {};
      state: {};
      last_updated: number;
    },
  ];
  properties: Property[];
}
