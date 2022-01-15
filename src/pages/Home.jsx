import { Fragment } from 'react';
import Catalog from "../components/Catalog";
import TopSales from "../components/TopSales";

export default function Home() {
  return (
    <Fragment>
      <TopSales/>
      <Catalog/>
    </Fragment>
  )
}