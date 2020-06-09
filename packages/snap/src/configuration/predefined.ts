import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  network: "f"
};

export const filecoinTestnetConfiguration: SnapConfig = {
  network: "t"
};

export const defaultConfiguration: SnapConfig = filecoinMainnetConfiguration;
