import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaginationArrowContainerProps {
	isDisabled: boolean;
	direction: 'left' | 'right';
}

interface PaginationNumberContainerProps {
	isActive: boolean;
	position: 'first' | 'last' | 'middle' | 'single' | undefined;
}


export default function Pagination({ totalPages }: { totalPages: number }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;
	const [currentPerPage, setCurrentPerPage] = useState<number>(Number(searchParams.get('per_page')) || 10);

	const createPageURL = (pageNumber: number | string, limit: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		params.set('per_page', limit.toString());
		return `${pathname}?${params.toString()}`;
	};

	const generatePagination = (currentPage: number, totalPages: number) => {
		// If the total number of pages is 7 or less,
		// display all pages without any ellipsis.
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// If the current page is among the first 3 pages,
		// show the first 3, an ellipsis, and the last 2 pages.
		if (currentPage <= 3) {
			return [1, 2, 3, '...', totalPages - 1, totalPages];
		}

		// If the current page is among the last 3 pages,
		// show the first 2, an ellipsis, and the last 3 pages.
		if (currentPage >= totalPages - 2) {
			return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
		}

		// If the current page is somewhere in the middle,
		// show the first page, an ellipsis, the current page and its neighbors,
		// another ellipsis, and the last page.
		return [
			1,
			'...',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'...',
			totalPages,
		];
	};

	const allPages = generatePagination(currentPage, totalPages);

	return (
		<PagenationLayout>
			<PaginationContainer>
				<PaginationArrow
					direction="left"
					href={createPageURL(currentPage - 1, currentPerPage)}
					isDisabled={currentPage <= 1 ? true : false}
				/>

				<PaginationNumbers>
					{allPages.map((page, index) => {
						let position: 'first' | 'last' | 'middle' | 'single' | undefined;

						if (index === 0) position = 'first';
						if (index === allPages.length - 1) position = 'last';
						if (allPages.length === 1) position = 'single';
						if (page === '...') position = 'middle';

						return (
							<PaginationNumber
								key={index}
								href={createPageURL(page, currentPerPage)}
								page={page}
								position={position}
								isActive={currentPage === page}
							/>
						);
					})}
				</PaginationNumbers>

				<PaginationArrow
					direction="right"
					href={createPageURL(currentPage + 1, currentPerPage)}
					isDisabled={currentPage >= totalPages ? true : false}
				/>
			</PaginationContainer>
			<PerPageSelect value={currentPerPage} onChange={(e) => {
				setCurrentPerPage(Number(e.target.value));
				const newUrl = createPageURL(currentPage, Number(e.target.value));
				router.push(newUrl);
			}}>
				<PerPageOption value={5}>5</PerPageOption>
				<PerPageOption value={10}>10</PerPageOption>
				<PerPageOption value={15}>15</PerPageOption>
				<PerPageOption value={20}>20</PerPageOption>
				<PerPageOption value={25}>25</PerPageOption>
			</PerPageSelect>
		</PagenationLayout>
	);
}

function PaginationNumber({ page, href, isActive, position }: { page: number | string; href: string; position?: 'first' | 'last' | 'middle' | 'single'; isActive: boolean; }) {
	return isActive || position === 'middle' ? (
		<PaginationNumberContainer isActive={isActive} position={position}>
			{page}
		</PaginationNumberContainer>
	) : (
		<Link href={href}>
			<PaginationNumberContainer isActive={isActive} position={position}>
				{page}
			</PaginationNumberContainer>
		</Link>
	);
}

function PaginationArrow({ href, direction, isDisabled }: { href: string; direction: 'left' | 'right'; isDisabled: boolean; }) {
	return isDisabled ? (
		<PaginationArrowContainer direction={direction} isDisabled={isDisabled}>
			{direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
		</PaginationArrowContainer>
	) : (
		<Link href={href}>
			<PaginationArrowContainer direction={direction} isDisabled={isDisabled}>
				{direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
			</PaginationArrowContainer>
		</Link>
	);
}

const PaginationContainer = styled.div`
  display: inline-flex;
`;

const PaginationNumbers = styled.div`
  display: flex;
  margin-left: -1px;
`;

const PaginationNumberContainer = styled.div<PaginationNumberContainerProps>`
  display: flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  background-color: ${(props) => (props.isActive ? '#3b82f6' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  border-radius: ${(props) => {
		if (props.position === 'first' || props.position === 'single') return '0.375rem 0 0 0.375rem';
		if (props.position === 'last') return '0 0.375rem 0.375rem 0';
		return 'none';
	}};
  &:hover {
    background-color: ${(props) => (!props.isActive && props.position !== 'middle' ? '#f3f4f6' : 'transparent')};
		color: black;
  }
`;

const PaginationArrowContainer = styled.div<PaginationArrowContainerProps>`
  display: flex;
  height: 40px;
  width: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
	background-color: ${(props) => (props.isDisabled ? 'transparent' : '#f3f4f6')};
	color: ${(props) => (props.isDisabled ? '#d1d5db' : 'black')};
	pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  border: 1px solid #e5e7eb;
  margin-right: ${(props) => (props.direction === 'left' ? '0.5rem' : '0')};
  margin-left: ${(props) => (props.direction === 'right' ? '0.5rem' : '0')};
`;

const PerPageSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background: white;
  color: black;
  margin-left: 5px;
`

const PerPageOption = styled.option`
  background-color: #f3f3f3;
  color: #333;
`

const PagenationLayout = styled.div`
	display: flex;
	@media (max-width:400px) {
		flex-direction: column;
		gap: 10px
	}
`