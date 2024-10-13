export const columns = [
    {
      name: "Title",
      selector: (row) => row.Title,
      sortable: true,
    },
    {
      name: "Summary",
      selector: (row) => row.Summary,
      cell: (row) => (
        <div className="data-table-content-cell">
          {row.Summary}
        </div>
      ),
    },
    {
      name: "Content",
      selector: (row) => row.Content,
      cell: (row) => (
        <div className="data-table-content-cell">
          {row.Content}
        </div>
      ),
    },
  ];
  