import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <>
      <Header />
      <main className="bg-grey-8">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default Login;
