const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

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
    metadata.textContent = `${repository.language} · Starred ${repository.starredAt}`;

    item.append(title, description, metadata);
    repositoryList.append(item);
  });
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
    status.textContent = `${repositories.length} repositories`;
  } catch (error) {
    status.textContent = "Unable to load starred repositories.";
    console.error(error);
  }
}

loadRepositories();
