import axios from 'axios'

const baseURL = '/api'

//transactions 
export const fetchTransactions = () =>
  axios.get(`${baseURL}/transactions`).then((res) =>res.data)

export const createTransaction = (data) =>
  axios.post(`${baseURL}/transactions`,data).then((res) =>res.data)

export const updateTransaction = (id,data) =>
  axios.put(`${baseURL}/transactions/${id}`,data).then((res) =>res.data)

export const deleteTransaction = (id) =>
  axios.delete(`${baseURL}/transactions/${id}`).then((res) =>res.data)

//categories 
export const fetchCategories = () =>
  axios.get(`${baseURL}/categories`).then((res) =>res.data)

export const createCategory = (data) =>
  axios.post(`${baseURL}/categories`,data).then((res) =>res.data)

//accounts 
export const fetchAccounts = () =>
  axios.get(`${baseURL}/accounts`).then((res) =>res.data)

export const createAccount = (data) =>
  axios.post(`${baseURL}/accounts`,data).then((res) =>res.data)

export const updateAccount = (id,data) =>
  axios.put(`${baseURL}/accounts/${id}`,data).then((res) =>res.data)

//budgets
export const fetchBudgets = () =>
  axios.get(`${baseURL}/budgets`).then((res) =>res.data)

export const createBudget = (data) =>
  axios.post(`${baseURL}/budgets`,data).then((res) =>res.data)

export const updateBudget = (id,data) =>
  axios.put(`${baseURL}/budgets/${id}`,data).then((res) =>res.data)

//savings goals
export const fetchSavingsGoals = () =>
  axios.get(`${baseURL}/savings-goals`).then((res) =>res.data)

export const createSavingsGoal = (data) =>
  axios.post(`${baseURL}/savings-goals`,data).then((res) =>res.data)

export const deleteSavingsGoal = (id) =>
  axios.delete(`${baseURL}/savings-goals/${id}`).then((res) =>res.data)
