import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import dayjs from "dayjs";

export default function TransactionsList({ refreshList }) {
  const perPageRecord = import.meta.env.VITE_PER_PAGE_RECORD;
  const [transactions, setTransactions] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchTransactions = async (pageNumber = 1) => {
    try {
      const response = await axiosInstance.get(
        `finance/transactions?page=${pageNumber}`,
      );
      setTransactions(response.data.results);
      setTotalPage(Math.ceil(response.data.count / perPageRecord));
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page, refreshList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="my-5 p-3 text-center bg-light-dark rounded">
        {transactions.length === 0 ? (
          <h4>No transactions found.</h4>
        ) : (
          <div className="mb-5">
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Date </strong>
                      </TableCell>
                      <TableCell>
                        <strong>Description</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Amount</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>
                          {dayjs(t.date).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell>{t.description}</TableCell>
                        <TableCell
                          sx={{
                            color: t.amount < 0 ? "red" : "green",
                            fontWeight: 600,
                          }}
                        >
                          ${t.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="p-3 d-flex justify-content-center">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChangePage}
                  />
                </Stack>
              </div>
            </Paper>
          </div>
        )}
      </div>
    </>
  );
}
