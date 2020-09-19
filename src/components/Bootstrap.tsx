import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  useColorMode,
  VStack,
} from "@chakra-ui/core";
import ReactEcharts from 'echarts-for-react';

const SymbolInput = ({ initial, min, symbol, onChange, max }: {
  symbol: string
  initial?: number
  min?: number
  onChange?: (x: number) => void
  max?: number
}): JSX.Element => {
  const [value, setValue] = React.useState(initial?.toString() ?? "")

  const format = (val: string): string =>
    symbol + val

  const parse = (val: string): string =>
    val.replace(symbol, "")

  return (
    <NumberInput
      onChange={(valueString) => {
        const v = parse(valueString);
        setValue(v)
        if (onChange) {
          onChange(parseFloat(v))
        }
      }}
      value={format(value)}
      min={min}
      max={max}
    >
      <NumberInputField />
    </NumberInput>
  )
}

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

  return (
    <Stack
      direction={{
        sm: "column",
        md: "row",
      }}
    >
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

      <Box flex={1}>
        <ReactEcharts
          style={{
            height: '400px',
            width: '100%'
          }}
          theme={colorMode}
          option={{
            xAxis: {
              data: months ? Array.from(Array(months).keys()) : [],
            },
            yAxis: {
              axisLabel: {
                formatter(value: number) {
                  if (value > 1_000_000_000) {
                    return Math.floor(value / 1_000_000_000) + "B"
                  }
                  if (value > 1_000_000) {
                    return Math.floor(value / 1_000_000) + "M"
                  }
                  if (value > 10_000) {
                    return Math.floor(value / 1_000) + "K"
                  }
                  return value
                }
              }
            },
            series: [
              {
                data: series(savings, expenses, income, growth, Math.min(120, months)),
                type: 'line',
                smooth: true,
              }
            ],
          }}
        />
      </Box>
    </Stack>
  )
}
