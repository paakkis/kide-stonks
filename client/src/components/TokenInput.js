import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import fetch from "../services/fetch";
import { useState, useEffect } from "react";

const TokenInput = ({ token, setToken, setFilterString }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token]);

  const fetchUser = async (token) => {
    const fetchedUser = await fetch.fetchUser(token);
    setUser(fetchedUser);
  };

  const handleChange = (event) => {
    setToken(event.target.value);
    window.localStorage.setItem("kideToken", event.target.value);
    if (event.target.value > 20) {
      fetchUser(event.target.value);
    }
  };

  const handeFilterString = (event) => {
    setFilterString(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "25ch", color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#2a0062",
          },
          "&:hover fieldset": {
            borderColor: "#2a0062",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2a0062",
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          value={localStorage.getItem("kideToken")}
          id="outlined-helperText"
          placeholder="Syötä"
          label="Token"
          color="secondary"
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "darkgray",
              "& fieldset": {
                borderColor: "#2a0062",
                border: "2px solid #2a0062",
              },
              "&:hover fieldset": {
                borderColor: "#2a0062",
                border: "3px solid #2a0062",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2a0062",
                border: "3px solid #2a0062",
              },
              "&.MuiFormLabel-root-MuiInputLabel-root": {
                color: "white",
              },
              "&.Mui-focused": {
                color: "white",
              },
              "&.Mui-root": {
                color: "white",
              },
            },
          }}
        />
        {user && (
          <Box
            sx={{
              my: 2,
              color: "white",
              textAlign: "left",
              fontSize: ".75rem",
            }}
          >
            <div>User: {user.model.username}</div>
            <div>Name: {user.model.fullName}</div>
            <div>Email: {user.model.email}</div>
          </Box>
        )}
        <TextField
          id="outlined-helperText"
          placeholder="Esim. 'kerubi'"
          label="Lippu filtteri"
          color="secondary"
          onChange={handeFilterString}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "darkgray",
              "& fieldset": {
                borderColor: "#2a0062",
                border: "2px solid #2a0062",
              },
              "&:hover fieldset": {
                borderColor: "#2a0062",
                border: "3px solid #2a0062",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2a0062",
                border: "3px solid #2a0062",
              },
              "&.MuiFormLabel-root-MuiInputLabel-root": {
                color: "white",
              },
              "&.Mui-focused": {
                color: "white",
              },
              "&.Mui-root": {
                color: "white",
              },
            },
          }}
        />
      </div>
    </Box>
  );
};

export default TokenInput;
