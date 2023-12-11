'use client'
import styled from 'styled-components';
import Transaction from '../types';

interface StatusSpanProps {
	status: string;
}

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
	& > *:first-child {
    color:#6F767E;
  }
`;

// Create a styled table header cell
const StyledTh = styled.th`
  text-align: left;
  padding: 15px;
	font-size: 13px;
	font-weight: 500;
`;

// Create a styled table data cell
const StyledTd = styled.td`
  text-align: left;
  padding: 15px;
	font-weight: 600;
	@media (max-width: 650px) {
		font-size: 12px;
	}
`;

// Create a styled span for the status
const StatusSpan = styled.span<StatusSpanProps>`
  color:#1A1D1F;
	background-color: ${(props) => (props.status === 'Completed' ? '#60CA57' : 'rgba(111, 118, 126, 0.4)')};
	padding: 5px;
	border-radius: 4px;
`;

// Next.js component for the table

const TransactionsTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {

	return (
		<StyledTable>
			<StyledThead>
				<SortTr>
					<StyledTh>Date & Time</StyledTh>
					<StyledTh>Status</StyledTh>
					<StyledTh>Value</StyledTh>
					<StyledTh>User</StyledTh>
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
						<StyledTd>{transaction.username}</StyledTd>
					</StyledTr>
				))}
			</tbody>
		</StyledTable>
	);
};

export default TransactionsTable;
