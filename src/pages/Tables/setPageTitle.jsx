import { useState } from "react";
import Layout from "@/components/layout";
import UserData from "./setTable";

const UserPage = () => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <Layout pageTitle={pageTitle}>
      <UserData setPageTitle={setPageTitle} />
    </Layout>
  );
};

export default UserPage;
