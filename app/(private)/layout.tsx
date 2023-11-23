import NavBar from "./navbar";
import Header from './header'
import Footer from './footer'

export default function PrivateLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <Header />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
  