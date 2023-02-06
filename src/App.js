import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <center>
        <h1>TopHat Task</h1>
        <p>React Table with pagination</p>
      </center>
      <div className="App">
        <Table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Address</th>
            </tr>
          </thead>
          {
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{`${item.address.street},${item.address.city}`}</td>
                    </tr>
                  </tbody>
                );
              })}
        </Table>
             <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> 
      </div>
    </>
  );
}

export default App;
