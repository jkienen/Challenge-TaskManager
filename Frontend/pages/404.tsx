// Import modules
import { useEffect } from "react";
import Router from "next/router";


// Load and redirect 404 pages to index
export default function Custom404() {

  useEffect(() => {
    Router.replace("/")
  },[])

  return null
}