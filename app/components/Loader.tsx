import Image from "next/image";
import styled from "styled-components";

const Loader = () => {
	return (
		<LoaderLayout>
			<Image src={"/loading.gif"} alt="Loading..." width={200} height={200} />
		</LoaderLayout>
	)
}

const LoaderLayout = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60vh;
`

export default Loader;