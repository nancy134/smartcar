import Link from 'next/link';
import AccountButton from '../components/AccountButton';

// pages/index.js
export default function Home({ formattedDate }) {
  return (
    <>
      <h1>Login</h1>
      <AccountButton/>
      <p>{formattedDate}</p>
    </>
  );
}

export async function getStaticProps() {
  const buildDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  }).format(buildDate);

  return { props: { formattedDate } };
}
