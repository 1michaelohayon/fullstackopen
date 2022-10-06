import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, HealthCheckOption, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";





export type EntryFormValues = {
  type: "OccupationalHealthcare" | "Hospital" | "HealthCheck"
  date: string
  specialist: string
  diagnosisCodes?: string[]
  description: string
  employerName?: string
  sickLeave: { startDate: string, endDate: string }
  discharge: { date: string, criteria: string }
  healthCheckRating: 0 | 1 | 2 | 3 | 4
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];
const HealthCheckRatingOptions: HealthCheckOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" }
];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();


  return (
    <Formik
      initialValues={{
        date: "",
        type: "OccupationalHealthcare",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        description: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.employerName && values.type === "OccupationalHealthcare") {
          errors.employerName = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }



        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="date"
              placeholder="yyyy-mm-dd"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            {values.type === 'OccupationalHealthcare' ? (
              <label>
                <Field
                  label="Employer Name"
                  placeholder="employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Start date"
                  placeholder="sick leave start date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End date"
                  placeholder="sick leave end date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </label>
            ) : null}

            {values.type === 'Hospital' ? (
              <label>
                <Field
                  label="Discharge date"
                  placeholder="discharge date"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </label>
            ) : null}

            {values.type === 'HealthCheck' ? (
              <label>
                <SelectField label="Health check rating" name="healthCheckRating" options={HealthCheckRatingOptions} />
              </label>
            ) : null}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
