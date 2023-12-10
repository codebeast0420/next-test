'use client'

import styled from 'styled-components'
import TransactionsTable from './components/PayoutTbl'
import Search from './components/Search'
import Pagination from './components/Pagination'
import Transaction from './types'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'


export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    per_page?: string;
    term?: string;
  }
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  const currentPage = Number(searchParams?.page) || 1;
  const currentPerPage = Number(searchParams?.per_page) || 10;
  const currentQuery = searchParams?.query || '';

  useEffect(() => {
    console.log('current page', currentPage);
    setLoading(true);
    const TargetURL = currentQuery === '' ? 'payouts' : 'search';
    console.log(`https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/${TargetURL}?page=${currentPage}&limit=${currentPerPage}`);
    async function fetchData() {
      const res = await fetch(`https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/${TargetURL}?page=${currentPage}&limit=${currentPerPage}&query=${currentQuery}`);
      const data = await res.json();
      const result: Transaction[] = currentQuery === '' ? data.data : data;
      const totalCount = currentQuery === '' ? data.metadata.totalCount : data.length;
      setTotalPages(Math.ceil(totalCount / currentPerPage));
      setTransactions(result);
      console.log(data);
      setLoading(false);
    }

    fetchData();
  }, [currentPage, currentPerPage, currentQuery]);

  return (
    <MainLayout>
      <Title>Payouts</Title>
      <PayoutHistory>
        <HistoryTItle>
          <HistoryTag />
          Payout History
        </HistoryTItle>
        <IndexLayout>
          <Search placeholder='Search Payouts...' />
          <Pagination totalPages={totalPages} />
        </IndexLayout>
        {isLoading && (
          <Loader />
        )}
        {!isLoading && (
          <TransactionsTable transactions={transactions} />
        )}
      </PayoutHistory>
    </MainLayout>
  )
}

const MainLayout = styled.div`
  background: white;
  padding: 0 8vw 100px;
  padding-top: 100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  @media (max-width: 768px) {
    gap: 20px;
  }
`
const IndexLayout = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  @media (max-width: 982px) {
    flex-direction: column;
    gap: 10px;
  }
`
const Title = styled.h2`
  font-size: 35px;
  color: black;
  font-weight: bold;
`

const PayoutHistory = styled.div`
  padding-left: 2vw;
  color: black;
  display: flex;
  flex-direction: column;
`

const HistoryTItle = styled.div`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 45px;
`

const HistoryTag = styled.div`
  display: block;
  width: 20px;
  background:#999DFF;
  height: 90%;
  border-radius: 4px;
`