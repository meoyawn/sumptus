import React, { useState } from "react"
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  useColorMode,
  VStack,
  Text,
} from "@chakra-ui/core"
import { ResponsiveLineCanvas } from "@nivo/line"

const SymbolInput = ({ initial, min, symbol, onChange, max }: {
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
        color="gray.600"
        pos="absolute"
        top={2}
        left={3}
        zIndex={1}
      >
        {symbol}
      </Text>
    </Box>
  )

type Point = { x: number, y: number }

const series = (
  savings: number,
  expenses: number,
  income: number,
  increment: (current: number) => number,
  months: number,
): Point[] => {
  if (!months) return []

  const ret = Array<Point>(months)

  let balance = savings
  let currentIncome = income

  ret[0] = {
    x: 0,
    y: savings,
  }
  for (let i = 1; i < months; i++) {
    currentIncome = Math.max(0, currentIncome + increment(currentIncome))
    balance += currentIncome - expenses
    ret[i] = {
      x: i,
      y: balance,
    }
  }

  return ret
}

export default function Bootstrapping(): JSX.Element {
  const [savings, setSavings] = useState(34000)
  const [expenses, setExpenses] = useState(330)
  const [income, setIncome] = useState(371)
  const [compoundGrowth, setCompountGrowth] = useState(7)
  const [months, setMonths] = useState(24)
  const [fixedGrowth, setFixedGrowth] = useState(50)
  const [compound, setCompound] = useState(false)

  const { colorMode } = useColorMode()

  const increment = (current: number) =>
    compound
      ? (compoundGrowth ? current * compoundGrowth / 100 : 0)
      : (fixedGrowth ? fixedGrowth : 0)

  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <VStack
        spacing={4}
        width={{
          base: "100%",
          md: 200,
        }}
        align="start"
      >
        <FormControl id="savings">
          <FormLabel>Liquid Savings</FormLabel>
          <SymbolInput symbol="$" initial={savings} onChange={setSavings} />
          <FormHelperText>Total amount of money you can access</FormHelperText>
        </FormControl>

        <FormControl id="expenses">
          <FormLabel>Monthly Expenses</FormLabel>
          <SymbolInput symbol={"$"} min={0} initial={expenses} onChange={setExpenses} />
          <FormHelperText>Average monthly outflows from your bank account</FormHelperText>
        </FormControl>

        <FormControl id="income">
          <FormLabel>Current Monthly Income</FormLabel>
          <SymbolInput symbol={"$"} min={0} initial={income} onChange={setIncome} />
          <FormHelperText>Current average monthly income from all your activities</FormHelperText>
        </FormControl>

        <VStack alignItems="start">
          <Text fontWeight="medium">Monthly Income Growth</Text>
          <HStack>
            <Text>Fixed</Text>
            <Switch onChange={({ target: { checked } }) => setCompound(checked)} />
            <Text>Compound</Text>
          </HStack>
        </VStack>

        {compound
          ? (
            <FormControl id="growth" key="compound">
              <SymbolInput symbol="%" initial={compoundGrowth} onChange={setCompountGrowth} />
              <FormHelperText>Income growth compared to previous month</FormHelperText>
            </FormControl>
          )
          : (
            <FormControl id="fixedGrowth" key="fixed">
              <SymbolInput symbol="$" initial={fixedGrowth} onChange={setFixedGrowth} />
              <FormHelperText>Amount of new income you expect to add each month</FormHelperText>
            </FormControl>
          )}

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

      <Box flex={1} height={600}>
        <ResponsiveLineCanvas
          data={[
            {
              id: 'Growing Income',
              data: series(savings, expenses, income, increment, months),
            },
            {
              id: 'No Income',
              data: series(savings, expenses, 0, () => 0, months),
            },
          ]}
          xScale={{
            type: "linear",
          }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          axisLeft={{
            format: "$.3s",
            legend: "Savings",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          axisBottom={{
            legend: "Months",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          margin={{
            left: 55,
            bottom: 60,
          }}
          yFormat="$.3s"
          curve="monotoneX"
          colors={{ scheme: colorMode === 'light' ? "category10" : 'dark2' }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              itemWidth: 100,
              itemHeight: 0,
              translateY: 50,
              symbolSize: 12,
              symbolShape: 'circle',
            }
          ]}
          crosshairType={"cross"}
          enablePoints={false}
        />
      </Box>
    </Stack>
  )
}
