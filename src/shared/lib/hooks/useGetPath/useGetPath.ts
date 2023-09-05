import { useLocation } from 'react-router-dom';

function useGetPath() {
	const { pathname } = useLocation();
	return pathname.slice(pathname.lastIndexOf('/') + 1);
}

export default useGetPath;
