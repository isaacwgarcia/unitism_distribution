import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FormData } from "../components/lib/types";

import { createIndex, updateSubscription, distribute } from "../components/api";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
export default function Home() {
  const [messageOne, setMessageOne] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  const [messageThree, setMessageThree] = useState("");
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  async function handler() {
    await createIndex().then((response) => {
      if (response[0]) {
        setMessageOne(
          `Congrats - you've just created a new Pool!
          Network: Mumbai
          Super Token: USDCx
          Index ID: ${response[1]}`
        );
      }
    });
  }
  async function handlerUpdate(formState) {
    const response = await updateSubscription(formState);
    setMessageTwo(`Congrats - you've just updated an Index!
    Network: Mumbai
    Super Token: USDCx
    Index ID: ${formState.indexid}
    Subscriber: ${formState.suscriber}
    Units: ${formState.units} shares
    
 `);
  }
  async function handlerdistribute(formState) {
    const response = await distribute(formState);
    setMessageThree(
      `Congrats - you've just sent funds to your index!
         Network: Mumbai
         Super Token: USDCx
         Index ID:  ${formState.deposit_indexid}
         
      `
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Instant Distribution Aggrement</title>
        <meta name="description" content="Example Distribution Aggrement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h6 className={styles.title}>Instant Distribution Agreement</h6>

        <Grid container spacing={3} width="auto">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              border={1}
              borderRadius={3}
              justifyContent="space-around"
            ></Box>
            <Box border={1} borderRadius={3} mt={2}>
              <Box padding={2}>
                <button
                  onClick={() => {
                    handler();
                  }}
                >
                  Create Pool
                </button>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ height: "10vh", width: "75vw" }}
              >
                {" "}
                {messageOne ? messageOne : ""}
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
                &nbsp; &nbsp; &nbsp;
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
                />{" "}
                &nbsp; &nbsp; &nbsp;
                <TextField
                  id="standard-basic"
                  label="Units %"
                  variant="standard"
                  onChange={(ev) =>
                    setFormState({
                      ...formState,
                      ["units"]: ev.target.value,
                    })
                  }
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <button
                    onClick={() => {
                      handlerUpdate(formState);
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
                  {messageTwo ? messageTwo : ""}
                </Box>
              </Box>
            </Box>
            <Box border={1} borderRadius={3} mt={2}>
              <Box padding={2}>
                {" "}
                <TextField
                  id="standard-basic"
                  label="Pool ID"
                  variant="standard"
                  onChange={(ev) =>
                    setFormState({
                      ...formState,
                      ["deposit_indexid"]: ev.target.value,
                    })
                  }
                />{" "}
                &nbsp; &nbsp; &nbsp;
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
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <button
                    onClick={() => {
                      handlerdistribute(formState);
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
                >
                  {messageThree ? messageThree : ""}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
