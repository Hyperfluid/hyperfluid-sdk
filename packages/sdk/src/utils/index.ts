import { AccountAddress } from "@aptos-labs/ts-sdk";
import BigNumber from "bignumber.js";
import Long from "long";

export const tickComplement = (tick: number | string) => {
  const signed = Long.fromInt(BigNumber(tick).dp(0).toNumber());
  return signed.toUnsigned().toInt();
};

export const BASE = 1.0001;

// seconds after 100 years
export const poolDeadline = () => {
  return Math.floor(100 * 365 * 24 * 60 * 60 + Date.now() / 1e3);
};

export const LOWEST_TICK = "-443636";
export const HIGHEST_TICK = "443636";
export enum FeeTierIndex {
  "PER_0.01_SPACING_1" = 0,
  "PER_0.05_SPACING_5" = 1,
  "PER_0.3_SPACING_60" = 2,
  "PER_1_SPACING_200" = 3,
}
export const FeeTierItems = ["1", "5", "30", "100"];
export const FeeTierStep = [1, 10, 60, 200];
export const roundTickBySpacing = (
  tick: number | string,
  feeTierIndex: number
) => {
  const currentStep = FeeTierStep[feeTierIndex];
  // always towards zero
  return new BigNumber(tick)
    .div(currentStep)
    .dp(0, BigNumber.ROUND_DOWN)
    .times(currentStep)
    .toString();
};

export const POOL_STABLE_TYPE = false;

export const currencyCheck = (args: {
  currencyA: string;
  currencyB: string;
}) => {
  if (!args.currencyA || !args.currencyB) {
    throw new Error(
      "currencyA and currencyB are required and can not be empty"
    );
  }

  if (
    !AccountAddress.isValid({
      input: args.currencyA,
    }).valid ||
    !AccountAddress.isValid({
      input: args.currencyB,
    }).valid
  ) {
    throw new Error(
      "currencyA and currencyB must be valid aptos account/token address"
    );
  }
};

export const slippageCheck = (args: { slippage: number | string }) => {
  // slippage check
  if (!args.slippage || BigNumber(args.slippage).isNaN()) {
    args.slippage = 0.5;
  }

  if (BigNumber(args.slippage).lt(0)) {
    throw new Error("slippage must be greater than 0");
  } else if (BigNumber(args.slippage).gt(20)) {
    throw new Error("slippage must be less than 20");
  }
};

export const slippageCalculator = (
  amount: number | string,
  slippage: number | string
) => {
  return new BigNumber(amount)
    .minus(BigNumber(amount).times(slippage).div(100))
    .dp(0)
    .toNumber();
};
