import React from "react";
import { Form, Formik } from "formik";
import { Heading, VStack,Text } from "@chakra-ui/core";

import { TextField } from "./TextField";

type FormValues = {
  expectedReturn: number
  expenseRatio: number
  longTermCapitalGainsTax: number
  annualFees: number
  name:string
}

const initial = (): FormValues => (
  {
    expectedReturn: 10,
    expenseRatio: 0.1,
    longTermCapitalGainsTax: 13,
    annualFees: 120,
    name:"",
  }
)

type Return = {
  endCapital: number
  tax: number
}

const percent = (value: number, perc: number): number =>
  value / 100 * perc

const calculate = ({
  startingCapital,
  inflationRate,
  years,
  expectedReturn,
  expenseRatio,
  longTermCapitalGainsTax,
  annualFees,
}: {
  startingCapital: number,
  inflationRate: number,
  years: number,
  expectedReturn: number,
  expenseRatio: number,
  longTermCapitalGainsTax: number,
  annualFees: number,
}): Return => {
  let current = startingCapital
  let gains = 0
  let currentFees = annualFees

  for (let i = 0; i < years; i++) {
    const gain = percent(current, expectedReturn - expenseRatio)
    current += gain
    gains += gain

    currentFees += percent(currentFees, inflationRate)
    current -= currentFees
  }

  return {
    endCapital: current,
    tax: percent(gains, longTermCapitalGainsTax),
  }
}

const Fields = ({ global, values }: { global: Global, values: FormValues }) => {
  const { endCapital, tax } = calculate({ ...global, ...values })

  return (
    <VStack width={300}>
      <Text><b>${Math.round(endCapital - tax)}</b> after ${Math.round(tax)} in taxes</Text>

      <TextField
        name="name"
        label="Name"
        type="text"
        inputMode="text"
        symbol={"$"}
        required
      />

      <TextField
        name="expenseRatio"
        label="Expense Ratio"
        type="number"
        inputMode="decimal"
        symbol="%"
        required
      />
      <TextField
        name="expectedReturn"
        label="Expected Annualized Return"
        type="number"
        inputMode="decimal"
        symbol="%"
        required
      />
      <TextField
        name="annualFees"
        label="Annual Fees"
        type="number"
        inputMode="decimal"
        symbol="$"
        required
      />
      <TextField
        name="longTermCapitalGainsTax"
        label="Long Term Capital Gains Tax"
        type="number"
        inputMode="decimal"
        symbol="%"
        required
      />
    </VStack>
  )
}

type Global = {
  startingCapital: number
  inflationRate: number
  years: number
}

export default function OneETF(global: Global): JSX.Element {
  return (
    <Formik<FormValues>
      initialValues={initial()}
      onSubmit={() => {
      }}
    >
      {({ values }) => (
        <Form>
          <Fields global={global} values={values} />
        </Form>
      )}
    </Formik>
  )
}
