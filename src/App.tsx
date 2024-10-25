import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Toaster, toast } from "sonner";

import { MyDoc } from "./components/MyDoc";
import { columns } from "./utils/table";
import { Word } from "./types";

import "./App.css";

function App() {
  const [file, setFile] = useState<Word[]>([]);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const file = formData.get("file");
    if (!file) {
      toast.error("Please select a file");
    }

    const blobFile = new Blob([file!]);
    const reader = new FileReader();
    reader.readAsText(blobFile);
    reader.onload = () => {
      const data = reader.result;
      const parsedData = JSON.parse(data as string);
      setFile(parsedData.vocabulario_arqueología);
    };
  };

  return (
    <main className="app-wrapper">
      <div className="aw__header-wrapper">
        <h1>Vocabulary Reference</h1>
        <p>
          Submit a JSON file with all the words you want to learn and generate a
          PDF, without the need to do it manually in a spreadsheet or word
          document.
        </p>
        <p>
          For having the desired result, you need to submit a{" "}
          <strong>JSON</strong> file in a table format only.
        </p>
      </div>
      <div className="form-wrapper">
        <form method="POST" onSubmit={submitHandler}>
          <h2>Upload your file</h2>
          <input type="file" name="file" id="file" />
          <button type="submit" disabled={file.length > 0}>
            Load
          </button>

          <Toaster position="bottom-right" />
        </form>
      </div>

      {file.length > 0 && (
        <>
          <PDFDownloadLink
            document={<MyDoc file={file} />}
            fileName="vocabulary.pdf"
            className="download-link"
          >
            {({ blob, url, loading }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>

          <hr />

          <section className="vocabulary-wrapper">
            <h2>This is your vocabulary list</h2>
            <table className="table-wrapper">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.accessorKey}>{column.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {file.map((word) => (
                  <tr key={word.español}>
                    <td>{word.español}</td>
                    <td>{word.transliteración}</td>
                    <td>{word.hebreo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {/* <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <MyDoc file={file} />
      </PDFViewer> */}
    </main>
  );
}

export default App;
