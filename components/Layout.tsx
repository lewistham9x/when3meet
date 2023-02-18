import { Fragment, ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

interface Props {
  children: ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <Fragment>
      <Head>
        <title>{title} - When2Meet</title>
        <meta name="description" content="A simple scheduling tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="/logo.svg"
                  alt="when3meet"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/logo.svg"
                  alt="when3meet"
                />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Home
                </Link>
                <Link
                  href="/events"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  My events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </Fragment>
  );
};

export default Layout;
