import { Controller, Control, FieldValues, FieldErrors } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { MultiValue, SingleValue, StylesConfig } from "react-select";
import { Label } from "@/components/ui/label";
import ErrorMessage from "./ErrorMessage";
import { FormData, ValidFieldNames } from "./types";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SkillSelectProps {
  control: any;
  options: Option[];
  errors: any;
  name: ValidFieldNames;
  placeholder: string;
  label: string;
  isMulti: boolean;
}

const customStyles: StylesConfig<Option> = {
  singleValue: (base) => ({ ...base, color: "#154b79" }),
  valueContainer: (base) => ({
    ...base,
    color: "var(--text)",
    width: "100%",
    borderColor: "var(--primary)",
    padding: "0 8px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  control: (base) => ({
    ...base,
    color: "var(--text)",
    background: "var(--inputGray)",
    borderRadius: "10px",
    borderWidth: "2px",
    ":hover": {
      borderRadius: "10px",
    },
    ":active": {
      borderRadius: "10px",
    },
    ":focus": {
      borderRadius: "10px",
    },
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "var(--background)",
    color: "var(--text)",
    ":active": {
      backgroundColor: "var(--secondary)",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "var(--secondary)",
    borderRadius: "20px",
    padding: "5px",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "var(--text)",
    background: "var(--secondary)",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "var(--text)",
    ":hover": {
      backgroundColor: "var(--secondary)",
      color: "var(--text)",
      borderRadius: "20px",
    },
  }),
};

const MultiSelect = ({ control, options, errors, name, placeholder, label, isMulti = false }: SkillSelectProps) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
    { isMulti ?
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            isMulti
            options={options}
            value={
                Array.isArray(field.value)
                  ? field.value.map((item: string) => ({
                      value: item,
                      label: item,
                    }))
                  : []
              }
            onChange={(val) =>
                field.onChange((val as MultiValue<Option>).map((option) => option.value))
              }
            placeholder={placeholder}
            id={name}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "var(--hover-background)",
                primary: "var(--primary)",
                neutral30: "var(--border)",
                neutral50: "var(--accent)",
                neutral80: "var(--text)",
              },
            })}
          />
        )}
        rules={{ required: true }}
      />
        :
        <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          options={options}
          value={options.find((option) => option.value === field.value)}
          onChange={(val) => field.onChange((val as SingleValue<Option>)?.value)}
          placeholder={placeholder}
          id={name}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "var(--hover-background)",
              primary: "var(--primary)",
              neutral30: "var(--border)",
              neutral50: "var(--accent)", // Placeholder color
              neutral80: "var(--text)", // Input text color
            },
          })}
        />
      )}
      rules={{ required: true }}
    />
    }

      {errors && <ErrorMessage message={errors.message} />}
    </>
  );
};

export default MultiSelect;
