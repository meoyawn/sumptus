import React, { ReactNode } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/core";
import { ResponsiveLine } from '@nivo/line'
import { Form, Formik, useField } from "formik";

import SEO from "../../components/SEO";

// TODO pre fire expenses
// TODO post fire expenses
// extra capital
// bonds expense rate

const TextField = ({ symbol, label, helperText, ...props }: {
  symbol?: string
  label: string
  helperText?: ReactNode

  name: string
  type: "email" | "number" | "password" | "text" | "url"
  inputMode: "url" | "tel" | "email" | "decimal" | "numeric" | "text"
  required: boolean
  placeholder?: string
  min?: string
  max?: number
}): JSX.Element => {

  const [field, { touched, error }] = useField(props)

  return (
    <FormControl isRequired={props.required} >
      <FormLabel>{label}</FormLabel>

      {symbol
        ? (
          <InputGroup>
            <InputLeftElement>{symbol}</InputLeftElement>
            <Input {...field} {...props} min={props.min} />
          </InputGroup>
        )
        : <Input {...field} {...props} />}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      {touched && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

type FormValues = {
  netWorth: number

  monthlyExpenses: number // add fixed exchange fees here
  monthlySavings: number

  monthsOfExpensesInCash: number
  annualInflation: number

  expectedStocksReturn: number

  bondsPercent: number
  expectedBondsReturn: number

  expenseRatio: number

  otherAssets: number
  otherAssetsExpectedReturn: number

  longTermCapitalGainsTax: number
}

const initial = (): FormValues => (
  {
    netWorth: 76000,
    monthlyExpenses: 500,
    monthlySavings: 100,

    monthsOfExpensesInCash: 12,
    annualInflation: 3.91,

    expectedStocksReturn: 10.6,
    expenseRatio: 0.15,

    bondsPercent: 0,
    expectedBondsReturn: 6.99,

    otherAssets: 43000,
    otherAssetsExpectedReturn: 0,

    longTermCapitalGainsTax: 13,
  }
)

const Fields = ({ monthlyExpenses, monthsOfExpensesInCash }: FormValues) => (
  <VStack
    spacing={4}
    width={{
      base: "100%",
      md: 230,
    }}
    align="start"
  >
    <TextField
      name="netWorth"
      label="Net Worth"
      type="number"
      inputMode="decimal"
      helperText="Assets minus debt"
      symbol="$"
      required
    />

    <TextField
      name="monthlyExpenses"
      label="Monthly Expenses"
      type="number"
      inputMode="decimal"
      helperText="Monthly cash outflow. Including brokerage fees and banking expenses"
      symbol="$"
      required
    />

    <TextField
      name="monthlySavings"
      label="Saving each month"
      type="number"
      inputMode="decimal"
      symbol="$"
      required
    />

    <TextField
      name="monthsOfExpensesInCash"
      label="Months of Expenses in Cash"
      type="number"
      inputMode="decimal"
      required
      helperText={(<>${monthlyExpenses} * {monthsOfExpensesInCash} months = ${monthlyExpenses * monthsOfExpensesInCash}</>)}
    />

    <TextField
      name="annualInflation"
      label="Inflation"
      type="number"
      inputMode="decimal"
      required
      symbol="%"
      helperText="Your expenses are growing by this amount each year"
    />

    <TextField
      name="expectedStocksReturn"
      label="Expected Return from Stocks"
      type="number"
      inputMode="decimal"
      required
      symbol="%"
      min="0"
    />

    <TextField
      name="expenseRatio"
      label="Expense Ratio"
      type="number"
      inputMode="decimal"
      required
      symbol="%"
      helperText="Average fee your ETFs and other funds take each year"
      min="0"
      max={100}
    />

    <TextField
      name="bondsPercent"
      label="Bonds Allocation"
      type="number"
      inputMode="decimal"
      required
      symbol="%"
      helperText="Portfolio percentage in bonds"
      min="0"
    />

    <TextField
      name="expectedBondsReturn"
      label="Expected Return from Bonds"
      type="number"
      inputMode="decimal"
      required
      min="0"
      symbol="%"
    />

    <TextField
      name="otherAssets"
      label="Other Assets"
      type="number"
      inputMode="decimal"
      required
      symbol="$"
      helperText="Other assets like real estate"
    />

    <TextField
      name="otherAssetsExpectedReturn"
      label="Expected Return from Other Assets"
      type="number"
      inputMode="decimal"
      required
      symbol="%"
      helperText="Rent and price gain/loss (annual)"
    />

    <TextField
      name="longTermCapitalGainsTax"
      label="Long Term Capital Gains Tax"
      type="number"
      inputMode="decimal"
      required
      symbol="%"
      helperText="Subtracted once"
    />
  </VStack>
)

type Point = { x: number, y: number }

type Return = {
  stocks: Point[]
  bonds: Point[]
  cash: Point[]
  other: Point[]
  capitalGains: number
}

const percent = (value: number, perc: number): number =>
  value / 100 * perc

const calculate = ({
  netWorth,
  otherAssets,
  bondsPercent,
  expectedBondsReturn,
  expectedStocksReturn,
  monthlyExpenses,
  monthsOfExpensesInCash,
  annualInflation,
  expenseRatio,
  otherAssetsExpectedReturn,
  monthlySavings,
  longTermCapitalGainsTax,
}: FormValues): Return => {
  const stocks: Point[] = []
  const bonds: Point[] = []
  const other: Point[] = []
  const cash: Point[] = []

  let capitalGains = 0

  if (!expectedStocksReturn || !expectedBondsReturn || !annualInflation) {
    return { stocks, bonds, other, cash, capitalGains }
  }

  // years
  let x = 0

  let currentBonds = percent(netWorth, bondsPercent)
  bonds.push({ x, y: currentBonds })

  let currentMonthlyExpenses = monthlyExpenses

  let currentCash = currentMonthlyExpenses * monthsOfExpensesInCash
  cash.push({ x, y: currentCash })

  let currentStocks = netWorth - currentBonds - currentCash - otherAssets
  if (currentStocks < 0) {
    return { stocks, bonds, other, cash, capitalGains }
  }
  stocks.push({ x, y: currentStocks })

  other.push({ x, y: otherAssets })

  do {
    x++

    currentMonthlyExpenses += percent(currentMonthlyExpenses, annualInflation)

    const previousCash = currentCash
    currentCash = currentMonthlyExpenses * monthsOfExpensesInCash;
    const extraCash = monthlySavings * 12 + percent(otherAssets, otherAssetsExpectedReturn) + previousCash - currentCash
    cash.push({ x, y: currentCash })

    const bondGains = percent(currentBonds, expectedBondsReturn)
    currentBonds += bondGains
    capitalGains += bondGains
    const balancedBonds = percent(currentCash + currentStocks + currentBonds + otherAssets, bondsPercent)
    const extraBonds = currentBonds - balancedBonds
    bonds.push({ x, y: balancedBonds })
    currentBonds = balancedBonds

    const stockGains = percent(currentStocks, expectedStocksReturn - expenseRatio)
    currentStocks += stockGains
    capitalGains += stockGains
    currentStocks += extraCash
    currentStocks += extraBonds
    stocks.push({ x, y: currentStocks })

    other.push({ x, y: otherAssets })
  } while (x < 100 && currentCash + currentStocks + currentBonds + otherAssets - percent(capitalGains, longTermCapitalGainsTax) < currentMonthlyExpenses * 12 * 25)

  return { stocks, bonds, other, cash, capitalGains }
}

const toData = ({ stocks, bonds, other, cash }: Return) => (
  [
    {
      id: "Other",
      data: other
    },
    {
      id: "Cash",
      data: cash,
    },
    {
      id: "Bonds",
      data: bonds,
    },
    {
      id: "Stocks",
      data: stocks
    },
  ]
)

function last<T>(arr: T[]) {
  return arr[arr.length - 1]
}

const endSum = ({ stocks, bonds, other, cash }: Return) =>
  last(stocks).y + last(bonds).y + last(cash).y + last(other).y

const taxes = ({ longTermCapitalGainsTax }: FormValues, { capitalGains }: Return) =>
  percent(capitalGains, longTermCapitalGainsTax)

const Calculations = (values: FormValues) => {
  const calc = calculate(values)
  const tax = taxes(values, calc)

  return (
    <VStack flex={1} height={700}>
      <Heading as="h2" size="md">
        It will take you {calc.stocks.length - 1} years to FI/RE
      </Heading>

      {calc.stocks.length && (
        <Text>
          Net worth: ${Math.round(endSum(calc) - tax)} after ${Math.round(tax)} in taxes
        </Text>
      )}

      <ResponsiveLine
        data={toData(calc)}
        xScale={{
          type: "linear",
        }}
        enableArea={true}
        areaBaselineValue={0}
        yScale={{
          type: "linear",
          // min: "auto",
          max: "auto",
          stacked: true,
        }}
        axisLeft={{
          format: "$.3s",
          legend: "Net Worth",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        axisBottom={{
          legend: "Years",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        margin={{
          left: 55,
          bottom: 60,
        }}
        yFormat="$.3s"
        curve="monotoneX"
        colors={{ scheme: 'set3' }}
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
        areaOpacity={0.9}
        useMesh={true}
        animate={false}
      />
    </VStack>
  )
}

const TheRetirement = (): JSX.Element => {
  return (
    <Formik<FormValues>
      onSubmit={(values) => {
        console.log(values)
      }}
      initialValues={initial()}
    >
      {({ values }) => (
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          width="100%"
        >
          <Form>
            <Fields {...values} />
          </Form>

          <Calculations {...values} />
        </Stack>
      )}
    </Formik>
  )
}

export default function Retirement(): JSX.Element {
  return (
    <VStack>
      <SEO title="Retirement calculator" />

      <Heading as="h1" size="2xl">
        Retirement calculator
      </Heading>

      <TheRetirement />
    </VStack>
  )
}
