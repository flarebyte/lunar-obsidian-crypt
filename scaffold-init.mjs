#!/usr/bin/env zx

await $`npx baldrick-whisker@latest object baldrick-broth.yaml github:flarebyte:baldrick-reserve:data/ts/baldrick-broth.yaml`;

const brothModel = {
  project: {
    title: "todo",
    description: "todo",
    version: "0.1.0",
    keywords: ["todo"],
  },
  readme: {
    highlights: ["todo"],
    links: ["[Npm dependencies](DEPENDENCIES.md)"],
  },
  github: {
    account: "flarebyte",
    name: "todo",
  },
  copyright: {
    holder: "Flarebyte.com",
    startYear: 2023,
  },
  license: "MIT",
  author: {
    name: "Olivier Huin",
    url: "https://github.com/olih",
  },
  implementation: {
    tags: ["lib"],
  },
  "workflow-version": "0.3.0",
};

const brothContent = await fs.readFile("baldrick-broth.yaml", {
  encoding: "utf8",
});
const brothObj = YAML.parse(brothContent);
brothObj.model = brothModel;

const newBrothContent = YAML.stringify(brothObj);

await fs.writeFile("baldrick-broth.yaml", newBrothContent, {
  encoding: "utf8",
});
