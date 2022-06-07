import React from "react";
import {
  createIndex,
  updateSubscription,
  distribute,
  createFlow,
  querySF,
} from "../components/api";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { FormData } from "../components/lib/types";

export default function Pay() {
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  async function handlerQuery() {
    querySF();
  }
  async function handler() {
    const response = await createFlow();
  }
  return (
    <Grid container spacing={3} width="auto">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box border={1} borderRadius={3} justifyContent="space-around"></Box>
        <Box border={1} borderRadius={3} mt={2}>
          <Box padding={2}>
            <TextField
              id="standard-basic"
              label="Sender"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["sender"]: ev.target.value,
                })
              }
            />{" "}
            <TextField
              id="standard-basic"
              label="Receiver"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["receiver"]: ev.target.value,
                })
              }
            />{" "}
            <TextField
              id="standard-basic"
              label="Super Token"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["supertoken"]: ev.target.value,
                })
              }
            />{" "}
            <TextField
              id="standard-basic"
              label="Flow Amount"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["flowamount"]: ev.target.value,
                })
              }
            />
            <button
              onClick={() => {
                handler();
              }}
            >
              Create Payment Flow
            </button>
            <button
              onClick={() => {
                handlerQuery();
              }}
            >
              Query SF
            </button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ height: "10vh", width: "75vw" }}
          >
            {" "}
          </Box>
        </Box>
        <Box border={1} borderRadius={3} mt={2}>
          <Box padding={2}>
            <TextField
              id="standard-basic"
              label="Pool ID"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["indexid"]: ev.target.value,
                })
              }
            />
            <TextField
              id="standard-basic"
              label="Subscriber Address"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["suscriber"]: ev.target.value,
                })
              }
            />
            <TextField
              id="standard-basic"
              label="Units"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["units"]: ev.target.value,
                })
              }
            />
            <Box display="flex" justifyContent="flex-end">
              <button
                onClick={() => {
                  console.log("subscriber with formState >", formState);
                }}
              >
                Add suscriber
              </button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ height: "10vh", width: "75vw" }}
            >
              {" "}
            </Box>
          </Box>
        </Box>
        <Box border={1} borderRadius={3} mt={2}>
          <Box padding={2}>
            {" "}
            <TextField
              id="standard-basic"
              label="Index ID"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["deposit_indexid"]: ev.target.value,
                })
              }
            />{" "}
            <TextField
              id="standard-basic"
              label="Amount in WEI"
              variant="standard"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["deposit_amount"]: ev.target.value,
                })
              }
            />{" "}
            <Box display="flex" justifyContent="flex-end">
              <button
                onClick={() => {
                  console.log("Deposit with formState >", formState);
                }}
              >
                Send Funds
              </button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ height: "10vh", width: "75vw" }}
            ></Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
