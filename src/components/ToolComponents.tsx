import React from "react";
import { Box, Input, Text } from "@chakra-ui/core";

export const SymbolInput = ({ initial, min, symbol, onChange, max }: {
  symbol: string
  initial?: number
  min?: number
  onChange?: (x: number) => void
  max?: number
}): JSX.Element => (
  <Box pos="relative">
    <Input
      onChange={({ target: { value } }) => {
        if (onChange) {
          onChange(parseFloat(value) || 0)
        }
      }}
      defaultValue={initial}
      type="number"
      inputMode="decimal"
      min={min}
      max={max}
      pl={8}
    />

    <Text
      color="gray.500"
      pos="absolute"
      top={2}
      left={3}
      zIndex={1}
    >
      {symbol}
    </Text>
  </Box>
)
