import { useMediaQuery as useResponsiveMediaQuery } from "react-responsive";

const useBreakpoints = () => {
    const isMobile = useResponsiveMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useResponsiveMediaQuery({
        query: "(min-width: 768px) and (max-width: 1024px)",
    });
    const isDesktop = useResponsiveMediaQuery({ query: "(min-width: 1025px)" });

    return { isMobile, isTablet, isDesktop };
};

export default useBreakpoints;
