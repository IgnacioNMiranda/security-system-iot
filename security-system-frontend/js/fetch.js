const tableHead = document.getElementById('tableHead');
const tableBody = document.getElementById("tableBody");

(async function() {
  try {
    const response = await fetch('http://localhost:3000/reports', {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
    });

    const reports = await response.json();

    if (reports.length == 0) {
      return;
    }

    tableHead.innerHTML =
      `
      <tr>
        <td>Fecha</td>
        <td>Hora</td>
        <td>Tipo</td>
      </tr>
      `;

    reports.forEach(report => {
      const { date } = report;
      const parsedDate = new Date(date);

      const day = ("" + parsedDate.getDate()).length == 1 ? "0" + parsedDate.getDate() : parsedDate.getDate();
      const month = ("" + (parsedDate.getMonth() + 1)).length == 1 ? "0" + (parsedDate.getMonth() + 1) : (parsedDate.getMonth() + 1);
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
  } catch (error) {
    tableBody.innerHTML +=
      `
      <tr>
        <td>No se pudo obtener información sobre los reportes.</td>
      </tr>
      `;
  }

})();
