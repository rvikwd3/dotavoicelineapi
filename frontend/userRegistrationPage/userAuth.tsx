import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "../src/components/Footer";
import RegisterSetupSection from "./components/RegisterSetupSection";
import RegistrationApp from "./components/RegistrationApp";
import "./css/index.css";
import { AuthUrlContext } from "../src/context/AuthUrlContext";

// To be passed in by HTML script
declare const expressTemplateData: string;

let templateData;
try {
  templateData = JSON.parse(expressTemplateData);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error(
      "ERROR: No templateData was passed to this page from the server."
    );
    // (probably a local dev environment)
    // Use .env provided values instead
    templateData = {
      pageTitle: "Registration Unsuccesful",
      login: "N/A",
      profileImgSrc: "",
      apiKey: "N/A",
      browserSourceId: "N/A",
      authUrl: "about:blank",
    };
  } else {
    throw error;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthUrlContext.Provider value={templateData.authUrl}>
      <RegistrationApp templateData={templateData} />
      <RegisterSetupSection />
      <Footer />
    </AuthUrlContext.Provider>
  </React.StrictMode>
);
