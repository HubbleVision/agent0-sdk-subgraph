import { dataSource, log } from "@graphprotocol/graph-ts"

/**
 * Get the chain ID for the current data source network
 * @returns Chain ID as i32, or 0 for unknown networks
 */
export function getChainId(): i32 {
  let network = dataSource.network()

  // ERC-8004 Supported Testnets
  if (network == "sepolia") {
    return 11155111  // Ethereum Sepolia
  } else if (network == "base-testnet" || network == "base-sepolia") {
    return 84532  // Base Sepolia (base-testnet in Studio)
  } else if (network == "linea-sepolia") {
    return 59141  // Linea Sepolia
  } else if (network == "polygon-amoy") {
    return 80002  // Polygon Amoy
  } else if (network == "hedera-testnet") {
    return 296  // Hedera Testnet
  } else if (network == "hyperevm-testnet") {
    return 998  // HyperEVM Testnet
  } else if (network == "skale-base-sepolia-testnet") {
    return 1351057110  // SKALE Base Sepolia Testnet
  } else if (network == "bsc-testnet" || network == "chapel") {
    return 97  // BSC Testnet
  }
  // Mainnets (for future use)
  else if (network == "mainnet") {
    return 1
  } else if (network == "base") {
    return 8453
  } else if (network == "linea") {
    return 59144
  } else if (network == "polygon") {
    return 137
  } else if (network == "arbitrum-one") {
    return 42161
  } else if (network == "optimism") {
    return 10
  } else if (network == "bsc" || network == "bsc-mainnet") {
    return 56
  } else if (network == "avalanche") {
    return 43114
  } else {
    log.warning("Unknown network: {}, using chain ID 0", [network])
    return 0
  }
}

/**
 * Get chain network name from chain ID
 * @param chainId Chain ID
 * @returns Network name (e.g., "bsc-testnet", "bsc")
 */
export function getChainName(chainId: i32): string {
  // Ethereum
  if (chainId == 11155111) {
    return "sepolia"
  }

  // Base
  if (chainId == 84532) {
    return "base-sepolia"
  }

  // Polygon
  if (chainId == 80002) {
    return "polygon-amoy"
  }

  // Linea
  if (chainId == 59141) {
    return "linea-sepolia"
  }

  // Hedera
  if (chainId == 296) {
    return "hedera-testnet"
  }

  // HyperEVM
  if (chainId == 998) {
    return "hyperevm-testnet"
  }

  // SKALE
  if (chainId == 1351057110) {
    return "skale-base-sepolia-testnet"
  }

  // BSC
  if (chainId == 97) {
    return "bsc-testnet"
  }
  if (chainId == 56) {
    return "bsc"
  }

  return "unknown"
}

/**
 * Get chain display name from chain ID
 * @param chainId Chain ID
 * @returns Display name (e.g., "BSC Testnet", "BSC Mainnet")
 */
export function getChainDisplayName(chainId: i32): string {
  // Ethereum
  if (chainId == 11155111) {
    return "Ethereum Sepolia"
  }

  // Base
  if (chainId == 84532) {
    return "Base Sepolia"
  }

  // Polygon
  if (chainId == 80002) {
    return "Polygon Amoy"
  }

  // Linea
  if (chainId == 59141) {
    return "Linea Sepolia"
  }

  // Hedera
  if (chainId == 296) {
    return "Hedera Testnet"
  }

  // HyperEVM
  if (chainId == 998) {
    return "HyperEVM Testnet"
  }

  // SKALE
  if (chainId == 1351057110) {
    return "SKALE Base Sepolia"
  }

  // BSC
  if (chainId == 97) {
    return "BSC Testnet"
  }
  if (chainId == 56) {
    return "BSC Mainnet"
  }

  return "Unknown Chain"
}

/**
 * Check if chain ID is known (has a registered network name)
 * Note: Use isSupportedChain() from contract-addresses.ts to check if contracts are deployed
 * @param chainId Chain ID
 * @returns true if the chain is known (regardless of contract deployment status)
 */
export function isKnownChain(chainId: i32): boolean {
  return getChainName(chainId) != "unknown"
}
