import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="bg-grey-8 w-full h-full flex justify-center py-28">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
