const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");
const statusMessage = document.querySelector("#status-message");
const retryButton = document.querySelector("#retry-button");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  if (repositories.length === 0) {
    statusMessage.textContent = "No starred repositories yet.";
    return;
  }

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository";

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repository.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = repository.name;
    title.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const metadata = document.createElement("p");
    metadata.className = "repository-meta";
    metadata.textContent = `${repository.language} · Starred `;

    const date = document.createElement("time");
    date.dateTime = repository.starredAt;
    date.textContent = repository.starredAt;
    metadata.append(date);

    item.append(title, description, metadata);
    repositoryList.append(item);
  });
}

async function loadRepositories() {
  retryButton.hidden = true;
  statusMessage.textContent = "Loading repositories...";

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be an array");
    }

    renderRepositories(repositories);
    if (repositories.length > 0) {
      statusMessage.textContent = `${repositories.length} repositories`;
    }
  } catch (error) {
    statusMessage.textContent = "Unable to load starred repositories.";
    retryButton.hidden = false;
    console.error(error);
  }
}

retryButton.addEventListener("click", loadRepositories);
loadRepositories();
