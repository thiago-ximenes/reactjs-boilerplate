import MockAdapter from 'axios-mock-adapter'
import { api } from "../index.ts";

export const mock = new MockAdapter(api)
