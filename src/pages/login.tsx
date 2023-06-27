import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import { NextPage } from "next";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - 34 Motors</title>
        <meta
          name="description"
          content="34 Motors é uma aplicação feita em NextJS, como trabalho de conclusão do curso da Kenzie Academy Brasil."
        />
      </Head>
      <div className="flex flex-col justify-between h-full">
        <Header />
        <main className="bg-grey-8 w-full flex justify-center py-28">
          <LoginForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Login;
