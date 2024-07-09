import { useEffect, useCallback } from "react";

function useInfiniteScroll(
  currentPage: number,
  totalPages: number,
  fetchMore: (page: number) => void
) {
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      currentPage < totalPages
    ) {
      fetchMore(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
}

export default useInfiniteScroll;
