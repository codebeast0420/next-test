import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styled from 'styled-components';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [term, setTerm] = useState<string>(searchParams.get('term') || '');
	const router = useRouter();

	const createPageURL = (term: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('query', term);
		if (term === '') params.delete('query');
		return `${pathname}?${params.toString()}`;
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			router.push(createPageURL(term))
		}
	};


	return (
		<SearchContainer>
			<SearchInput
				placeholder={placeholder}
				onKeyDown={handleKeyDown}
				onChange={(e) => {
					setTerm(e.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
			<IconContainer />
			<SearchBtn href={createPageURL(term)} />
		</SearchContainer>
	);
}


const SearchBtn = ({ href }: { href: string }) => {
	return (
		<Confirm>
			<Link href={href}><MagnifyingGlassIcon /></Link>
		</Confirm>
	)
}
// Styled components for each element
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-shrink: 0;
`;

const Confirm = styled.div`
	background: #007bff;
	color: white;
	margin-left: 2px;
	text-align: center;
	padding: 10px;
	display: flex;
	border-radius: 4px;
	justify-content: center;
	a {
		display: flex;
		align-items: center;

		svg {
			width: 20px;
			height: 20px;
		}
	}
`

const SearchInput = styled.input`
  display: block;
	background: white;
	color: black;
	width: 350px;
  border-radius: 0.375rem; /* Equivalent to 'rounded-md' */
  border: 1px solid #e5e7eb; /* Equivalent to 'border-gray-200' */
  padding: 9px;
  padding-left: 2.5rem; /* Equivalent to 'pl-10' */
  font-size: 0.875rem; /* Equivalent to 'text-sm' */
  outline: 2px solid transparent;
  outline-offset: 2px;
	@media (max-width: 400px) {
		width: 100%;
	}
  &::placeholder {
    color: black; /* Equivalent to 'placeholder:text-gray-500' */
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const IconContainer = styled(MagnifyingGlassIcon)`
  position: absolute;
  left: 0.75rem; /* Equivalent to 'left-3' */
  top: 50%;
  height: 18px;
  width: 18px;
  transform: translateY(-50%);
  color: #9ca3af; /* Equivalent to 'text-gray-500' */
  ${SearchInput}:focus + & {
    color: #374151; /* Equivalent to 'peer-focus:text-gray-900' */
  }
`;
