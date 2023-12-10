type Transaction = {
	dateAndTime: string;
	status: 'Pending' | 'Completed';
	value: string;
	username: string;
};

export default Transaction