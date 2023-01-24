import Header from "../../src/components/Header";
import SafetyCard from "./SafetyCard";
import UserCard from "./UserCard";

type TemplateData = {
  profileImgSrc: string;
  login: string;
  pageTitle: string;
  apiKey: string;
  browserSourceId: string;
  authUrl: string;
}

const RegistrationApp = ({templateData}: { templateData: TemplateData; }) => {
  if (!templateData) {
    console.error("ERROR: No templateData was passed to this page from the server");
  }

  // Remove pageTitle from data to pass to Card
  const { pageTitle, authUrl, ...cardProps } = templateData;

  return (
    <>
      <div className="registrationPageContainer">
        <Header />
        <div className="title epilogue">
          {templateData.pageTitle}
        </div>
        <UserCard {...cardProps} />
        <SafetyCard />
      </div>
    </>
  );
};

export default RegistrationApp;
