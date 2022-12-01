import axios from "axios";
import { parseCookies } from "nookies";
import { getAPIClient } from "./axios";

export const api = getAPIClient()