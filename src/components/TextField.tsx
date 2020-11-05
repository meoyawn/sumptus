import React, { ReactNode } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/core";

export const TextField = ({ symbol, label, helperText, ...props }: {
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

  const theInput = <Input {...field} {...props} />

  return (
    <FormControl isRequired={props.required}>
      <FormLabel>{label}</FormLabel>

      {symbol
        ? (
          <InputGroup>
            <InputLeftElement>{symbol}</InputLeftElement>
            {theInput}
          </InputGroup>
        )
        : theInput}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      {touched && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
