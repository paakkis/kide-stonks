import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CityMenu from "./components/CityMenu";
import EventMenu from "./components/EventMenu";
import TokenInput from "./components/TokenInput";
import fetch from "./services/fetch";
import BuyButton from "./components/BuyButton";
import Card from "@mui/material/Card";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import EventInfo from "./components/EventInfo";
import { ThemeProvider, createTheme } from "@mui/material";

const App = () => {
  const [city, setCity] = useState("");
  const [event, setEvent] = useState("");
  const [token, setToken] = useState("");
  const [filterString, setFilterString] = useState("");
  const [eventInfo, setEventInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [openErrorNotification, setOpenErrorNotification] = useState(false);
  const [openMessageNotification, setOpenMessageNotification] = useState(false);
  const [extraId, setExtraId] = useState("");
  const [useProxy, setUseProxy] = useState(false);


  console.log(filterString);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedStonkuser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      fetch.setToken(user.token);
    }
    setToken(localStorage.getItem("kideToken"));

    const initializeExtraId = async () => {
      const fetchedExtraId = await fetch.fetchExtraId();
      setExtraId(fetchedExtraId || "d4adee2f5a49440e835ced5330470a69");
    };
    initializeExtraId();
  }, []);

  if (user === null) {
    return (
      <LoginForm
        setMessage={setMessage}
        setError={setError}
        setOpenMessageNotification={setOpenMessageNotification}
        setOpenErrorNotification={setOpenErrorNotification}
        setUser={setUser}
      />
    );
  }

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Roboto Mono",
        textTransform: "none",
        fontSize: 16,
      },
      h5: {
        color: "white",
      },
    },
    root: {
      "&. MuiFormLabel-root": {
        color: "white",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Notification
          message={message}
          error={error}
          openErrorNotification={openErrorNotification}
          setOpenErrorNotification={setOpenErrorNotification}
          openMessageNotification={openMessageNotification}
          setOpenMessageNotification={setOpenMessageNotification}
        />
        <Navbar
          setMessage={setMessage}
          setError={setError}
          setUser={setUser}
          setOpenMessageNotification={setOpenMessageNotification}
          setOpenErrorNotification={setOpenErrorNotification}
          user={user}
        />
        <Card
          sx={{
            width: 400,
            minHeight: 500,
            margin: "auto",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            background: "#262828",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CityMenu setCity={setCity} city={city} setEvents={setEvents} />
          <EventMenu
            setEvent={setEvent}
            events={events}
            event={event}
            setEventInfo={setEventInfo}
          />
          <TokenInput
            token={token}
            setToken={setToken}
            setFilterString={setFilterString}
            useProxy={useProxy}
            setUseProxy={setUseProxy}
          />
          <BuyButton
            event={eventInfo}
            setMessage={setMessage}
            setError={setError}
            setOpenMessageNotification={setOpenMessageNotification}
            setOpenErrorNotification={setOpenErrorNotification}
            token={token}
            setEventInfo={setEventInfo}
            extraId={extraId}
            filterString={filterString}
            useProxy={useProxy}
          />
        </Card>
        {eventInfo === null ? <></> : <EventInfo event={eventInfo} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
