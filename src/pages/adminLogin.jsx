import React from "react";
import { LoginArea } from "../components/LoginForm";
import PageBackdrop from "../components/PageBackdrop";
import { AdminLogin } from "../components/AdminLogin";
const AdminLoginPage = () => {
  return (
    <PageBackdrop>
      <AdminLogin/>
    </PageBackdrop>
  );
};

export default AdminLoginPage;
