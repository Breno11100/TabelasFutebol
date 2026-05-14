const apiKey = "172345692bc347c9a073720faeb78f75";

async function carregarLiga(codigoLiga) {

  const container = document.getElementById("tabela-container");

  container.innerHTML = "Carregando...";

  try {

    const url = `https://api.football-data.org/v4/competitions/${codigoLiga}/standings`;

    const proxy = `https://corsproxy.io/?${encodeURIComponent(url)}`;

    const response = await fetch(proxy, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    const data = await response.json();

    console.log(data);

    const tabela = data.standings[0].table;

    let html = `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>PTS</th>
            <th>J</th>
            <th>V</th>
            <th>D</th>
          </tr>
        </thead>

        <tbody>
    `;

    tabela.forEach(time => {

      html += `
        <tr>
          <td>${time.position}</td>

          <td class="team">
            <img src="${time.team.crest}" width="24">
            ${time.team.shortName}
          </td>

          <td>${time.points}</td>
          <td>${time.playedGames}</td>
          <td>${time.won}</td>
          <td>${time.lost}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;

  } catch (erro) {

    console.log(erro);

    container.innerHTML = "Erro ao carregar tabela.";
  }
}

function voltar() {
  window.location.href = "../index.html";
}