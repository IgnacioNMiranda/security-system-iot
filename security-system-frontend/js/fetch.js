const tableBody = document.getElementById("tableBody");

(async function() {
  const response = await fetch('http://localhost:3000/reports', {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
  });

  const reports = await response.json();

  reports.forEach(report => {
    const { date } = report;
    const parsedDate = new Date(date);

    const day = ("" + parsedDate.getDay()).length == 1 ? "0" + parsedDate.getDay() : parsedDate.getDay();
    const month = ("" + parsedDate.getMonth()).length == 1 ? "0" + parsedDate.getMonth() : parsedDate.getMonth();
    const year = ("" + parsedDate.getFullYear()).length == 1 ? "0" + parsedDate.getFullYear() : parsedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const hour = ("" + parsedDate.getHours()).length == 1 ? "0" + parsedDate.getHours() : parsedDate.getHours();
    const minutes = ("" + parsedDate.getMinutes()).length == 1 ? "0" + parsedDate.getMinutes() : parsedDate.getMinutes();
    const seconds = ("" + parsedDate.getSeconds()).length == 1 ? "0" + parsedDate.getSeconds() : parsedDate.getSeconds();
    const formattedTime = `${hour}:${minutes}:${seconds}`;

    tableBody.innerHTML +=
      `
      <tr>
        <td>${formattedDate}</td>
        <td>${formattedTime}</td>
        <td>${report.type}</td>
      </tr>
      `;
  });
})();
