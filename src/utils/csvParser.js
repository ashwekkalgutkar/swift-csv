import csvParser from "csv-parser";

const parseCSV = (file, callback) => {
  const results = [];

  csvParser(file)
    .on("data", (data) => results.push(data))
    .on("end", () => {
      callback(results);
    });
};

export default parseCSV;
