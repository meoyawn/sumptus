import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useColorMode,
  VStack,
} from "@chakra-ui/core";
import { ResponsiveLineCanvas } from "@nivo/line";

const SymbolInput = ({ initial, min, symbol, onChange, max }: {
  symbol: string
  initial?: number
  min?: number
  onChange?: (x: number) => void
  max?: number
}): JSX.Element => (
  <InputGroup>
    <InputLeftAddon pointerEvents="none">{symbol}</InputLeftAddon>

    <Input
      onChange={({ target: { value } }) => {
        if (onChange) {
          onChange(parseFloat(value))
        }
      }}
      defaultValue={initial}
      type="number"
      min={min}
      max={max}
    />
  </InputGroup>
)

const series = (savings: number, expenses: number, income: number, growth: number, months: number): number[] => {
  if (!months) return []

  const ret = Array(months)

  let balance = savings
  let currentIncome = income

  ret[0] = savings
  for (let i = 1; i < months; i++) {
    currentIncome = Math.max(currentIncome + currentIncome * growth / 100)
    balance += currentIncome - expenses
    ret[i] = balance
  }

  return ret
}

export default function Bootstrap(): JSX.Element {
  const [savings, setSavings] = useState(32000)
  const [expenses, setExpenses] = useState(330)
  const [income, setIncome] = useState(371)
  const [growth, setGrowth] = useState(15.7)
  const [months, setMonths] = useState(24)

  const { colorMode } = useColorMode()

  const ys = series(savings, expenses, income, growth, months)

  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <form>
        <VStack>
          <FormControl id="savings">
            <FormLabel>Liquid Savings</FormLabel>
            <SymbolInput symbol={"$"} initial={savings} onChange={setSavings} />
          </FormControl>

          <FormControl id="expenses">
            <FormLabel>Monthly Expenses</FormLabel>
            <SymbolInput symbol={"$"} min={0} initial={expenses} onChange={setExpenses} />
          </FormControl>

          <FormControl id="income">
            <FormLabel>Current Monthly Income</FormLabel>
            <SymbolInput symbol={"$"} min={0} initial={income} onChange={setIncome} />
          </FormControl>

          <FormControl id="growth">
            <FormLabel>Monthly Income Growth</FormLabel>
            <SymbolInput symbol={"%"} initial={growth} onChange={setGrowth} />
          </FormControl>

          <FormControl id="months">
            <Slider defaultValue={months} onChange={setMonths} min={2} max={120}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <FormHelperText>{months} months</FormHelperText>
          </FormControl>
        </VStack>
      </form>

      <Box flex={1} height={400}>
        <ResponsiveLineCanvas
          data={[
            {
              id: 'id',
              data: Array.from(Array(months).keys()).map((x, i) => (
                {
                  x,
                  y: ys[i],
                }
              )),
            }
          ]}
          xScale={{
            type: "linear",
          }}
          axisLeft={{
            format: ".2s",
            legend: "Savings",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          axisBottom={{
            tickValues: 10,
            legend: "Months",
            legendPosition: "middle",
            legendOffset: 30,
          }}
          margin={{
            left: 55,
            bottom: 50,
            right: 50,
          }}
          yFormat=".2s"
          curve="monotoneX"
          colors={{ scheme: colorMode === 'light' ? "category10" : 'dark2' }}
        />
      </Box>
    </Stack>
  )
}
