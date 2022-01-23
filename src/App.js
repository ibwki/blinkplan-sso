import logo from "./blinkplan_logo.png";
import "./App.css";
import { getUserDataFromStore } from "./mockStoreHooks";
import { userData } from "./mockDB";
import { useState } from "react";

const baseAPI = "https://agsmeis-v2-api.azurewebsites.net/api";

function App() {
  const [fetchedUserData, setFetchedUserData] = useState(() =>
    getUserDataFromStore()
  );
  const [loading, setLoading] = useState(false);

  const { bvn, firstName, lastName, userID, email } = fetchedUserData || {
    bvn: "",
    firstName: "",
    lastName: "",
    userID: "",
    email: "",
  };

  let values = {
    firstName,
    otherNames: lastName || firstName,
    email,
    userGUID: userID,
    bvn,
    dateOfBirth: new Date().toJSON(),
    password: "AGSMEISapp@123",
    role: "APPLICANT",
    userSource: "AGSMEIS",
    authorization: "bearer no-authorization-key",
    centerName: "default",
    centerOID: 0,
    phoneNumber: "080",
  };

  const getTokenFromLS = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return token;
    }
    return null;
  };

  const handleHandshake = async () => {
    const token = getTokenFromLS();
    if (token && fetchedUserData) {
      setLoading(true);
      try {
        const res = await fetch(
          `${baseAPI}/BlinkPlanSSO/LoginToBlinkPlanAGSMEIS`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: token,
            },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();
        if (res.status === 200) {
          window.open(
            `${data?.serializedBody?.redirectToBlinkPlanDashboard}`,
            "_blank"
          );
        } else {
          alert(`${data?.message}`);
        }
      } catch (error) {
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      alert(
        "Seems you are offline. Please login to start creating business plan."
      );
    }
  };

  const handleLoginUser = () => {
    localStorage.setItem(
      "authToken",
      "DEMO-Mock-JWT-1234567890987654321-KENCHI"
    );
    localStorage.setItem("user", JSON.stringify(userData));
    setFetchedUserData(userData);
  };

  const handleSignOutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setFetchedUserData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="status_bar">
          <button
            className="status_bar_cta"
            type="button"
            onClick={fetchedUserData ? handleSignOutUser : handleLoginUser}>
            {fetchedUserData ? "Sign out" : "Login"}
          </button>

          <div className="status">
            {fetchedUserData ? (
              <>
                <div className="status__dot online"></div> <em>Online</em>
              </>
            ) : (
              <>
                <div className="status__dot offline"></div> <em>Offline</em>
              </>
            )}
          </div>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <p>Demo illustrating Single Sign-On (SSO) with BlinkPlan.</p>

        <span>click the button to initiate the SSO.</span>
        <button className="App-cta" type="button" onClick={handleHandshake}>
          {loading ? "Handshaking..." : "Create Business Plan"}
        </button>
      </header>
    </div>
  );
}

export default App;
