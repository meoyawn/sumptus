import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Button, Heading, HStack, VStack } from "@chakra-ui/core";

import { TextField } from "../../components/TextField";
import OneETF from "../../components/OneETF";

type FormValues = {
  startingCapital: number
  inflationRate: number
  years: number
}

const initial = (): FormValues => (
  {
    startingCapital: 30000,
    inflationRate: 3.91,
    years: 30,
  }
)

type Etf = {
  key: number
}

export default function Gains(): JSX.Element {
  const [etfs, setEtfs] = useState<Etf[]>([])

  return (
    <Formik<FormValues>
      initialValues={initial()}
      onSubmit={() => {
      }}
    >
      {({ values }) => (
        <Form>
          <VStack spacing={4}>
            <Heading as={"h1"} size={"2xl"}>ETFs simulator</Heading>
            <HStack>
              <TextField
                name="startingCapital"
                label="Starting Capital"
                type="number"
                inputMode="decimal"
                helperText="TODO"
                symbol="$"
                required
              />

              <TextField
                name="inflationRate"
                label="Inflation Rate"
                type="number"
                inputMode="decimal"
                helperText="TODO"
                symbol="%"
                required
              />

              <TextField
                name="years"
                label="Years"
                type="number"
                inputMode="decimal"
                helperText="TODO"
                required
              />

              <Button
                onClick={() => setEtfs(etfs.concat({ key: Math.random() }))}
              >Add</Button>
            </HStack>

            <HStack>
              {etfs.map(x => <OneETF key={x.key} {...values} />)}
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  )
}
