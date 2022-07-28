import React from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { FileList } from "../../components/FileList";

const FileListPage = () => {
  return (
    <div className={`bg_dark `} style={{ minHeight: "100vh" }}>
      <Layout title={"Final Files"}>
        <FileList />
      </Layout>
    </div>
  );
};

export default FileListPage;
