'use client'

import styled from 'styled-components'
import TransactionsTable from './components/PayoutTbl'

export default function Home() {
  return (
    <MainLayout>
      <Title>Payouts</Title>
      <PayoutHistory>
        <HistoryTItle>
          <HistoryTag />
          Payout History
        </HistoryTItle>
        <TransactionsTable />
      </PayoutHistory>
    </MainLayout>
  )
}

const MainLayout = styled.div`
  background: white;
  padding: 0 8vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  @media (max-width: 768px) {
    gap: 20px;
  }
`

const Title = styled.h2`
  font-size: 3vw;
  color: black;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const PayoutHistory = styled.div`
  padding-left: 2vw;
  color: black;
  display: flex;
  flex-direction: column;
`

const HistoryTItle = styled.div`
  font-size: 2.2vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const HistoryTag = styled.div`
  display: block;
  width: 20px;
  background:#999DFF;
  height: 90%;
  border-radius: 4px;
`