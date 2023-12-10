'use client'

import { useEffect, useState } from 'react';
// Import styled-components and create styles for the table
import styled from 'styled-components';
import Transaction from '../types';

// Create a styled table
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

// Create styled table header
const StyledThead = styled.thead`
  background-color: #f3f3f3;
`;

const SortTr = styled.tr`
	background-color: white;
	color: #6F767E;
	padding: 5px;
`
// Create styled table row
const StyledTr = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
	padding-left: 10px;
`;

// Create a styled table header cell
const StyledTh = styled.th`
  text-align: left;
  padding: 15px;
	font-size: 15px;
`;

// Create a styled table data cell
const StyledTd = styled.td`
  text-align: left;
  padding: 15px;
	@media (max-width: 396px) {
		font-size: 10px;
	}
`;

// Create a styled span for the status
const StatusSpan = styled.span`
  color: ${(props) => (props.status === 'Completed' ? 'green' : 'red')};
  font-weight: bold;
`;

// Next.js component for the table

const TransactionsTable: React.FC = ({
	searchParams,
} : {
	searchParams?: {
		query?: string;
		page?: string;
	}
}) => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts');
			const data = await res.json();
			const result: Transaction[] = data.data;
			setTransactions(result);
			console.log(data);
		}

		fetchData();
	}, []);

	return (
		<StyledTable>
			<StyledThead>
				<SortTr>
					<StyledTh>Date & Time</StyledTh>
					<StyledTh>Status</StyledTh>
					<StyledTh>Value</StyledTh>
				</SortTr>
			</StyledThead>
			<tbody>
				{transactions.map((transaction, index) => (
					<StyledTr key={index}>
						<StyledTd>
							{new Date(transaction.dateAndTime).toLocaleDateString('en-US', {
								weekday: 'short',
								month: 'short',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								hour12: false
							})}
						</StyledTd>
						<StyledTd>
							<StatusSpan status={transaction.status}>
								{transaction.status == "Completed" ? "Paid" : transaction.status}
							</StatusSpan>
						</StyledTd>
						<StyledTd>{transaction.value}</StyledTd>
					</StyledTr>
				))}
			</tbody>
		</StyledTable>
	);
};

export default TransactionsTable;
