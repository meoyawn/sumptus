import React from "react";
import { FormControl, FormLabel, HStack, NumberInput, NumberInputField, Stack, Text, VStack } from "@chakra-ui/core";

const format = (val: string): string =>
  `$` + val

const parse = (val: string): string =>
  val.replace(/^\$/, "")

const USDInput = ({ initial,min }: { initial?: number, min?:number }): JSX.Element => {
  const [value, setValue] = React.useState(initial?.toString() ?? "")

  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
      min={min}
    >
      <NumberInputField />
    </NumberInput>
  )
}

export default function Bootstrap(): JSX.Element {
  return (
    <HStack>

      <form>
        <VStack>
          <FormControl id="savings">
            <FormLabel>Liquid Savings</FormLabel>
            <USDInput initial={32000} />
          </FormControl>

          <FormControl id="expenses">
            <FormLabel>Monthly Expenses</FormLabel>
            <USDInput min={0} />
          </FormControl>

          <FormControl id="income">
            <FormLabel>Current Monthly Income</FormLabel>
            <USDInput min={0} />
          </FormControl>

          <FormControl id="growth">
            <FormLabel>Monthly Income Growth</FormLabel>
            <USDInput />
          </FormControl>
        </VStack>
      </form>

      <Stack flex="1">
        <Text>xx</Text>
      </Stack>
    </HStack>
  )
}
