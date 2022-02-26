import React from "react";

import CreateOrgForm from "../../components/CreateOrgForm/CreateOrgForm";
import AnimatedBG from "../../components/shared/AnimatedBG/AnimatedBG";

import styles from "./CreateOrgPage.module.css";

const CreateOrgPage = () => {
  return (
    <div style={{ minHeight: "100vh" }} className={styles.wrapper}>
      <AnimatedBG />
      <CreateOrgForm />
    </div>
  );
};

export default CreateOrgPage;
